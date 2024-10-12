import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const create = async () => {
  try {
    const dirPath = path.join(dirname, '.', 'files');
    const filePath = path.join(dirPath, 'fresh.txt');

    await promises.mkdir(dirPath, { recursive: true });

    try {
      await promises.access(filePath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    await promises.writeFile(filePath, 'I am fresh and young\n');
	}

  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

await create();