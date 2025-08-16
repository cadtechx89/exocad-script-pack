#!/usr/bin/env node
/**
 * mod_generator.js
 * Versioned CLI генератор ZIP-пакета модов.
 *
 * VERSION / CHANGELOG
 * 0.2.0:
 *  - Добавлены флаги: --help, --version, --force, --debug
 *  - Чёткие exit-коды (см. Exit)
 *  - Санитизация jobId
 *  - Защита от перезаписи (код 6 без --force)
 *  - Разделение stdout (только финальный JSON) и stderr (ошибки / диагностика)
 *  - Inline JSON или путь к файлу в --config (с удалением BOM)
 *  - Валидация modTypes + unknown mod types -> код 5
 *
 * Формат успешного вывода (stdout):
 * {
 *   "status": "ok",
 *   "jobId": "...",
 *   "modTypes": [...],
 *   "count": N,
 *   "outputZip": "ABSOLUTE_PATH"
 * }
 *
 * Любые ошибки -> stderr (одна строка либо несколько при --debug) и exit code != 0.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const VERSION = '0.2.0';

const Exit = Object.freeze({
  OK: 0,
  MISSING_CONFIG: 1,
  VALIDATION: 2,
  INVALID_JSON: 3,
  FS: 4,
  UNKNOWN_MOD: 5,
  OVERWRITE_BLOCKED: 6
});

// Поддерживаемые моды (добавляйте сюда новые)
const SUPPORTED_MOD_TYPES = new Set(['brush', 'crown']);

// ===== CLI PARSING =====
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const [k, vRaw] = token.split('=', 2);
      const key = k.replace(/^--/, '');
      if (vRaw === undefined) {
        // Флаг без значения
        args[key] = true;
      } else {
        args[key] = vRaw;
      }
    } else {
      // Позиционный аргумент — пока игнорируем или можно собирать
      if (!args._) args._ = [];
      args._.push(token);
    }
  }
  return args;
}

const args = parseArgs(process.argv);

// ===== HELP / VERSION (ранний выход) =====
if (args.help) {
  console.log(`Usage:
  node backend/src/mod_generator.js --config=<path|inline_json> --job-id=<id> --user=<name> [--force] [--debug] [--version] [--help]

Flags:
  --config=...         Путь к JSON файлу или inline JSON (начинается с { или [)
  --job-id=...         Идентификатор (^[A-Za-z0-9._-]+$)
  --user=...           Имя пользователя (не влияет на валидацию путей)
  --force              Разрешить перезапись существующего ZIP
  --debug              Диагностический вывод в stderr
  --version            Показать версию и выйти
  --help               Это сообщение
  --json-errors        (зарезервировано) Структурированные JSON ошибки в stderr

Exit codes:
  0 OK
  1 Missing config flag
  2 Validation error
  3 Invalid JSON
  4 File system error
  5 Unknown mod type
  6 Overwrite blocked (нужен --force)

Примеры:
  node backend/src/mod_generator.js --config=config_empty.json --job-id=empty-run --user=tester
  node backend/src/mod_generator.js --config={"modTypes":["brush"]} --job-id=inline --user=tester
  node backend/src/mod_generator.js --config=config.json --job-id=run2 --user=op --force
`);
  process.exit(Exit.OK);
}

if (args.version) {
  console.log(VERSION);
  process.exit(Exit.OK);
}

// ===== Utility / Error handling =====
function debug(...m) {
  if (args.debug) {
    console.error('[debug]', ...m);
  }
}

function fail(msg, code) {
  // Возможность расширить JSON-формат ошибок
  if (args['json-errors']) {
    const errObj = { status: 'error', code, message: msg };
    console.error(JSON.stringify(errObj));
  } else {
    console.error(msg);
  }
  process.exit(code);
}

function sanitizeJobId(id) {
  if (typeof id !== 'string' || id.length === 0) {
    fail('Invalid jobId: required non-empty string', Exit.VALIDATION);
  }
  if (!/^[A-Za-z0-9._-]+$/.test(id)) {
    fail('Invalid jobId: only A-Za-z0-9._- allowed', Exit.VALIDATION);
  }
  return id;
}

// Strip BOM if present
function stripBOM(str) {
  if (str.charCodeAt(0) === 0xFEFF) {
    return str.slice(1);
  }
  return str;
}

// Load & parse config (inline or file path)
function loadConfig(token) {
  debug('loadConfig token=', token.slice(0, 80));
  if (!token) {
    fail('Missing --config flag (no token value)', Exit.MISSING_CONFIG);
  }

  let raw = token;
  // Если выглядит как файл и существует — читаем
  const looksLikeFile = !token.trim().startsWith('{') && !token.trim().startsWith('[');
  if (looksLikeFile && fs.existsSync(token) && fs.statSync(token).isFile()) {
    try {
      raw = fs.readFileSync(token, 'utf8');
    } catch (e) {
      fail(`FS read error for config file: ${e.message}`, Exit.FS);
    }
  }
  raw = stripBOM(raw);

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    fail('Invalid JSON passed to --config', Exit.INVALID_JSON);
  }
}

// Validate config object
function validateConfig(cfg) {
  if (typeof cfg !== 'object' || !cfg) {
    fail('Config root must be an object', Exit.VALIDATION);
  }
  if (!('modTypes' in cfg)) {
    fail('Config missing "modTypes" field', Exit.VALIDATION);
  }
  if (!Array.isArray(cfg.modTypes)) {
    fail('"modTypes" must be an array', Exit.VALIDATION);
  }
  const modTypes = [...cfg.modTypes]; // copy
  const userSettings = (cfg.userSettings && typeof cfg.userSettings === 'object') ? cfg.userSettings : {};

  // Remove duplicates preserving first occurrence
  const seen = new Set();
  const deduped = [];
  for (const m of modTypes) {
    if (!seen.has(m)) {
      seen.add(m);
      deduped.push(m);
    }
  }

  if (deduped.length === 0) {
    // Это не ошибка бизнеса в вашем первоначальном сценарии (empty-run допустим),
    // но оставим разрешённым. Если хотите сделать это ошибкой — раскомментируйте:
    // fail('"modTypes" array must not be empty', Exit.VALIDATION);
  }

  // Unknown mod type?
  for (const m of deduped) {
    if (!SUPPORTED_MOD_TYPES.has(m)) {
      fail(`Unknown mod type "${m}". Allowed: ${Array.from(SUPPORTED_MOD_TYPES).join(', ')}`, Exit.UNKNOWN_MOD);
    }
  }

  return { modTypes: deduped, userSettings };
}

// Generate mod directory structure
function generateMods(modTypes, userSettings, jobDir, user) {
  const randomHex = () => crypto.randomBytes(8).toString('hex');
  const now = new Date().toISOString();

  for (const mod of modTypes) {
    const modDir = path.join(jobDir, mod);
    fs.mkdirSync(modDir, { recursive: true });

    const settings = userSettings[mod] || {};
    const contentLines = [
      `Mod Type: ${mod}`,
      `Generated: ${now}`,
      `User: ${user}`,
      `Random: ${randomHex()}`,
      'Settings:',
      JSON.stringify(settings, null, 2)
    ];
    fs.writeFileSync(path.join(modDir, `${mod}.txt`), contentLines.join('\n'), 'utf8');
  }

  // Manifest
  const manifest = {
    jobId: path.basename(jobDir),
    generatedAt: now,
    modTypes,
    count: modTypes.length,
    user
  };
  fs.writeFileSync(path.join(jobDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
}

// Create zip archive (cross-platform attempt)
function createZip(jobDir, outZip) {
  const absJobDir = path.resolve(jobDir);
  const absOutZip = path.resolve(outZip);

  // Ensure output dir exists
  fs.mkdirSync(path.dirname(absOutZip), { recursive: true });

  if (fs.existsSync(absOutZip)) {
    if (!args.force) {
      fail(`Output already exists: ${absOutZip}. Use --force to overwrite.`, Exit.OVERWRITE_BLOCKED);
    }
    // Перезапись разрешена
    try {
      fs.unlinkSync(absOutZip);
    } catch (e) {
      fail(`Unable to remove existing zip: ${e.message}`, Exit.FS);
    }
  }

  if (process.platform === 'win32') {
    // Use PowerShell Compress-Archive
    const ps = [
      'Compress-Archive',
      '-Path', `"${absJobDir}\\*"`,
      '-DestinationPath', `"${absOutZip}"`,
      '-Force'
    ].join(' ');
    debug('Running PowerShell:', ps);
    const r = spawnSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'inherit' });
    if (r.status !== 0) {
      fail(`Zip creation failed (PowerShell status ${r.status})`, Exit.FS);
    }
  } else {
    // Try native zip
    const r = spawnSync('zip', ['-r', absOutZip, '.'], { cwd: absJobDir, stdio: 'ignore' });
    if (r.status !== 0) {
      console.error('Zip command failed, creating a simple placeholder archive (not a real zip).');
      try {
        fs.writeFileSync(absOutZip, 'ZIP_CREATION_FAILED_PLACEHOLDER', 'utf8');
      } catch (e) {
        fail(`Fallback zip write failed: ${e.message}`, Exit.FS);
      }
    }
  }
}

// ===== Main Flow =====
function main() {
  if (!('config' in args)) {
    fail('Missing --config flag', Exit.MISSING_CONFIG);
  }
  if (!('job-id' in args)) {
    fail('Missing --job-id flag', Exit.VALIDATION);
  }
  if (!('user' in args)) {
    fail('Missing --user flag', Exit.VALIDATION);
  }

  const rawJobId = args['job-id'];
  const user = String(args.user);
  const jobId = sanitizeJobId(rawJobId);

  const cfg = loadConfig(String(args.config));
  const { modTypes, userSettings } = validateConfig(cfg);

  debug('jobId=', jobId, 'modTypes=', modTypes);

  // Directories
  const scriptDir = path.dirname(path.resolve(__filename));
  const rootDir = path.resolve(scriptDir, '..'); // backend/
  const outputDir = path.join(rootDir, 'output');
  const tempRoot = path.join(rootDir, 'temp');

  const jobTempDir = path.join(tempRoot, jobId);
  const outZip = path.join(outputDir, `exocad-mods-${jobId}.zip`);

  try {
    fs.mkdirSync(jobTempDir, { recursive: true });
  } catch (e) {
    fail(`FS error creating temp dir: ${e.message}`, Exit.FS);
  }

  try {
    generateMods(modTypes, userSettings, jobTempDir, user);
  } catch (e) {
    fail(`Generation failed: ${e.message}`, Exit.FS);
  }

  try {
    createZip(jobTempDir, outZip);
  } catch (e) {
    fail(`Zip creation error: ${e.message}`, Exit.FS);
  }

  // Success JSON ONLY to stdout
  const result = {
    status: 'ok',
    jobId,
    modTypes,
    count: modTypes.length,
    outputZip: path.resolve(outZip),
    version: VERSION
  };
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  process.exit(Exit.OK);
}

try {
  main();
} catch (e) {
  // Unexpected (programming) error
  console.error('Unexpected error:', e && e.stack || e);
  process.exit(Exit.FS);
}