#!/usr/bin/env node
/**
 * Простой генератор модов.
 * Способы задать конфиг:
 *  --config='{"modTypes":["brush"]}'
 *  --config config.json
 *  --config=@config.json
 * Параметры:
 *  --job-id=job-123
 *  --user=username
 */
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');

function parseArgs(argv = process.argv.slice(2)) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    let m = token.match(/^--([^=]+)=(.*)$/);
    if (m) {
      out[m[1]] = m[2];
      continue;
    }
    m = token.match(/^--(.+)$/);
    if (m) {
      const key = m[1];
      if (argv[i + 1] && !argv[i + 1].startsWith('--')) {
        out[key] = argv[i + 1];
        i++;
      } else {
        out[key] = 'true';
      }
    }
  }
  return out;
}

async function loadConfig(raw) {
  let text = raw;
  if (text.startsWith('@')) text = text.slice(1);

  if (await fs.pathExists(text) && (text.endsWith('.json') || (await fs.stat(text)).isFile())) {
    try {
      let fileContent = await fs.readFile(text, 'utf8');
      // Удаляем BOM, если есть
      fileContent = fileContent.replace(/^\uFEFF/, '');
      return JSON.parse(fileContent);
    } catch (e) {
      console.error('Invalid JSON content inside file:', text);
      process.exit(3);
    }
  }

  try {
    return JSON.parse(raw.replace(/^\uFEFF/, ''));
  } catch (e) {
    console.error('Invalid JSON passed to --config');
    process.exit(3);
  }
}

async function main() {
  const args = parseArgs();
  if (!args.config) {
    console.error('Missing --config');
    process.exit(1);
  }

  const jobId = args['job-id'] || `job-${Date.now()}`;
  const user = args['user'] || 'unknown';

  const tempRoot = path.join(__dirname, '../temp');
  const outputDir = path.join(__dirname, '../output');

  const config = await loadConfig(args.config);
  const modTypes = Array.isArray(config.modTypes) ? config.modTypes : [];
  if (modTypes.length === 0) {
    console.warn('Warning: config.modTypes is empty – nothing to generate.');
  }

  const jobDir = path.join(tempRoot, jobId);
  await fs.ensureDir(jobDir);
  await fs.ensureDir(outputDir);

  for (const mod of modTypes) {
    const modFolder = path.join(jobDir, mod);
    await fs.ensureDir(modFolder);
    const content = [
      `Mod Type: ${mod}`,
      `Generated: ${new Date().toISOString()}`,
      `User: ${user}`,
      `Random: ${crypto.randomBytes(8).toString('hex')}`,
      `Settings: ${JSON.stringify(config.userSettings?.[mod] || {}, null, 2)}`
    ].join('\n');
    await fs.writeFile(path.join(modFolder, `${mod}.txt`), content, 'utf8');
  }

  const zipName = `exocad-mods-${jobId}.zip`;
  const zipPath = path.join(outputDir, zipName);

  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(jobDir, false);
    archive.finalize();
  });

  console.log(JSON.stringify({
    status: 'ok',
    jobId,
    user,
    zip: zipPath,
    modTypes
  }, null, 2));
}

main().catch(e => {
  console.error('Unhandled error:', e);
  process.exit(99);
});