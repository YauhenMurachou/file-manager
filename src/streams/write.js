import fs from 'fs';


const write = async () => {
	const filePath = './files/fileToWrite.txt';
  const fileStream = fs.createWriteStream(filePath);

  process.stdin.pipe(fileStream);
};

await write();