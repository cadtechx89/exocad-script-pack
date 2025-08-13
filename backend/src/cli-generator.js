#!/usr/bin/env node
/**
 * Простой генератор модов.
 * Параметры:
 *  --config='JSON'
 *  --job-id='job-123'
 *  --user='username'
 */
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  args.forEach(a => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  });
  return out;
}

async function main() {
  const args = parseArgs();
  if (!args['config']) {
    console.error('Missing --config');
    process.exit(1);
  }
  const jobId = args['job-id'] || `job-${Date.now()}`;
  const user = args['user'] || 'unknown';
  let config;
  try {
    config = JSON.parse(args['config']);
  } catch (e) {
    console.error('Invalid JSON in --config');
    process.exit(1);
  }

  const modTypes = config.modTypes || [];
  const baseDir = path.join(__dirname, '../temp', jobId);
  const outDir = path.join(__dirname, '../output');
  await fs.ensureDir(baseDir);
  await fs.ensureDir(outDir);

  // Простая эмуляция генерации
  for (const mod of modTypes) {
    const modFolder = path.join(baseDir, mod);
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

  // Упаковать всё в ZIP
  const zipName = `exocad-mods-${jobId}.zip`;
  const zipPath = path.join(outDir, zipName);

  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(baseDir, false);
    archive.finalize();
  });

  console.log(`Generated ZIP: ${zipPath}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});