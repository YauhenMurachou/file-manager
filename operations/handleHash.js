import fs from 'fs';
import crypto from 'crypto';

export function handleHash(args) {
  if (args.length === 0) {
    console.log('Invalid input');
    return;
  }
  try {
    const fileContent = fs.readFileSync(args[0]);
    const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
    console.log(hash);
  } catch (error) {
    console.log('Operation failed');
  }
}
