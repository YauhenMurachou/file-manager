import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const read = async () => {
  try {
    const filePath = path.join(dirname, '.', 'files', 'fileToRead.txt');
    const content = await promises.readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(error.message);
      throw new Error('FS operation failed');
    }
  }
};

await read();