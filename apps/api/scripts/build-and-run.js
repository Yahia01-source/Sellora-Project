const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const distMain = path.join(__dirname, '..', 'dist', 'main.js');

console.log('Building...');
execSync('npx nest build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

function waitForFile(filePath, maxAttempts, delayMs) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      if (fs.existsSync(filePath)) {
        resolve();
        return;
      }
      if (attempts >= maxAttempts) {
        reject(new Error(`File not found after ${maxAttempts} attempts: ${filePath}`));
        return;
      }
      console.log(`Waiting for dist/main.js... attempt ${attempts}/${maxAttempts}`);
      setTimeout(check, delayMs);
    };
    check();
  });
}

waitForFile(distMain, 20, 500)
  .then(() => {
    console.log('Found dist/main.js, starting server...');
    const child = spawn(process.execPath, [distMain], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    child.on('exit', (code) => process.exit(code ?? 0));
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
