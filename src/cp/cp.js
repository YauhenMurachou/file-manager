import { spawn } from 'child_process';
import fs from 'fs';

const  spawnChildProcess = async(args) => {
  if (!fs.existsSync('src/cp/files/script.js')) {
    throw new Error('script.js not found.');
  }

  const child = spawn('node', ['src/cp/files/script.js', ...args]);

  return new Promise((resolve, reject) => {
    child.stdout.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new   
      Error(`Child process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    process.stdin.pipe(child.stdin);
  });
}

spawnChildProcess(['someArgument1', 'someArgument2']);