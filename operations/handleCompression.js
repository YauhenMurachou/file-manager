import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export async function handleCompression(command, args) {
  if (args.length !== 2) {
    console.log('Invalid input');
    return;
  }

  try {
    const [inputPath, outputPath] = args;
    const readStream = fs.createReadStream(inputPath);

    let finalOutputPath = outputPath;
    if (command === 'compress' && !outputPath.endsWith('.gz')) {
      finalOutputPath = `${outputPath}.gz`;
    }

    if (fs.existsSync(finalOutputPath) && fs.statSync(finalOutputPath).isDirectory()) {
      const inputFileName = path.basename(inputPath);
      const compressedFileName = command === 'compress' ? `${inputFileName}.gz` : inputFileName.replace('.gz', '');
      finalOutputPath = path.join(finalOutputPath, compressedFileName);
    }

    const writeStream = fs.createWriteStream(finalOutputPath);

    if (command === 'compress') {
      await pipelineAsync(readStream, zlib.createGzip(), writeStream);
    } else {
      await pipelineAsync(readStream, zlib.createGunzip(), writeStream);
    }

    console.log('Operation successful');
  } catch (error) {
    console.log('Operation failed', error);
  }
}
