const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs-extra');

async function generateMods(req, res) {
  const { modTypes, userSettings } = req.body;
  const jobId = uuidv4();
  const tempDir = path.join(__dirname, '../../temp', jobId);
  await fs.ensureDir(tempDir);

  // Здесь вставить логику генерации модов
  // Записываем тестовый файл
  const testFile = path.join(tempDir, 'test.txt');
  await fs.writeFile(testFile, 'Hello from ExoCad Generator!');

  res.json({
    success: true,
    jobId,
    download: `/downloads/${jobId}/test.txt`
  });
}

module.exports = { generateMods };