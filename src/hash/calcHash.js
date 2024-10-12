import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
	const hash = crypto.createHash('sha256');
  const fileStream = fs.createReadStream('./files/fileToCalculateHashFor.txt');

  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  fileStream.on('end', () => {
    const hexHash = hash.digest('hex');
    console.log(hexHash);
  });
};

await calculateHash();
