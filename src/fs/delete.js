import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const remove = async () => {
  try {
    const filePath = path.join(dirname, '.', 'files', 'fileToRemove.txt');
    await promises.unlink(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(error.message);
      throw new Error('FS operation failed');
    }
  }
};

await remove();