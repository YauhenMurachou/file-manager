import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const rename = async () => {
  try {
    const wrongFilename = 'wrongFilename.txt';
    const properFilename = 'properFilename.md';

    const wrongFilePath = path.join(dirname, '.', 'files', wrongFilename);
    const properFilePath = path.join(dirname, '.', 'files', properFilename);

    const wrongFileStats = await promises.stat(wrongFilePath);
    if (!wrongFileStats.isFile()) {
			throw new Error('FS operation failed');
    }
    await promises.rename(wrongFilePath, properFilePath);

  } catch (error) {
    console.error(error.message);
    throw new Error('FS operation failed');
  }
};

await rename();