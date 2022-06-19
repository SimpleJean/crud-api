import fs from 'fs';

export default function writeDataFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
