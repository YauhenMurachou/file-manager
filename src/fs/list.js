import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const list = async () => {
  try {
    const filesDir = path.join(dirname, '.', 'files');
    const files = await promises.readdir(filesDir);
    console.log(files);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(error.message);
      throw new Error('FS operation failed');
    }
  }
};

await list();