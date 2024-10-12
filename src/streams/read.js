import fs from 'fs';

const read = async () => {
	const filePath = './files/fileToRead.txt';
  const fileStream = fs.createReadStream(filePath);

  fileStream.pipe(process.stdout);
};

await read();