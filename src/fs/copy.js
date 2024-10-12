import { promises } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = import.meta.url;
const dirname = path.dirname(fileURLToPath(filename));

const copy = async () => {
  try {
    const originalDir = path.join(dirname, '.', 'files');
    const targetDir = path.join(dirname, 'files_copy');

    const stats = await promises.stat(originalDir);
    if (!stats.isDirectory()) {
      throw new Error('FS operation failed');
    }

    await promises.mkdir(targetDir, { recursive: true });
    await promises.cp(originalDir, targetDir, { recursive: true });
  
  } catch (error) {
    console.error(error.message);
    throw new Error('FS operation failed');
  }
};

await copy();