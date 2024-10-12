import fs from 'fs';
import zlib from 'zlib';

const compress = async () => {
  const fileStream = fs.createReadStream('./files/fileToCompress.txt');
  const gzipStream = zlib.createGzip();
  const outputStream = fs.createWriteStream('archive.gz');

  fileStream.pipe(gzipStream).pipe(outputStream);
};

await compress();