import readline from 'readline';
import { homedir } from 'os';
import { chdir, cwd } from 'process';

import { 
  handleNavigation,
  handleFileOperations,
  handleOSInfo,
  handleHash,
  handleCompression
} from './operations.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let username = '';

const args = process.argv.slice(2);
args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key === '--username') {
    username = value;
  }
});
if (!username) {
  throw new Error('Username is required');
}
console.log(`Welcome to the File Manager, ${username}!`);

chdir(homedir());

function printCurrentDirectory() {
  console.log(`You are currently in ${cwd()}`);
}

function processCommand(input) {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
    case 'cd':
    case 'ls':
      handleNavigation(command, args);
      break;
    case 'cat':
    case 'add':
    case 'rn':
    case 'cp':
    case 'mv':
    case 'rm':
      handleFileOperations(command, args);
      break;
    case 'os':
      handleOSInfo(args);
      break;
    case 'hash':
      handleHash(args);
      break;
    case 'compress':
    case 'decompress':
      handleCompression(command, args);
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log('Invalid input');
  }

  printCurrentDirectory();
}

rl.on('line', processCommand);

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

printCurrentDirectory();
