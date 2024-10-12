import fs from 'fs';
import zlib from 'zlib';

const decompress = async () => {
  const inputStream = fs.createReadStream('archive.gz');
  const gunzipStream = zlib.createGunzip();
  const outputStream = fs.createWriteStream('fileToCompress.txt');

  inputStream.pipe(gunzipStream).pipe(outputStream);
};

await decompress();