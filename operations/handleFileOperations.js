import fs from 'fs';
import path from 'path';

export function handleFileOperations(command, args) {
  switch (command) {
    case 'cat':
      if (args.length === 0) {
        console.log('Invalid input');
        return;
      }
      try {
        const readStream = fs.createReadStream(args[0]);
        readStream.pipe(process.stdout);
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'add':
      if (args.length === 0) {
        console.log('Invalid input');
        return;
      }
      try {
        fs.writeFileSync(args[0], '');
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'rn':
      if (args.length !== 2) {
        console.log('Invalid input');
        return;
      }
      try {
        fs.renameSync(args[0], args[1]);
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'cp':
      if (args.length !== 2) {
        console.log('Invalid input');
        return;
      }
      try {
        const readStream = fs.createReadStream(args[0]);
        const writeStream = fs.createWriteStream(path.join(args[1], path.basename(args[0])));
        readStream.pipe(writeStream);
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'mv':
      if (args.length !== 2) {
        console.log('Invalid input');
        return;
      }
      try {
        const readStream = fs.createReadStream(args[0]);
        const writeStream = fs.createWriteStream(path.join(args[1], path.basename(args[0])));
        readStream.pipe(writeStream);
        readStream.on('end', () => {
          fs.unlinkSync(args[0]);
        });
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
    case 'rm':
      if (args.length === 0) {
        console.log('Invalid input');
        return;
      }
      try {
        fs.unlinkSync(args[0]);
      } catch (error) {
        console.log('Operation failed', error);
      }
      break;
  }
}
