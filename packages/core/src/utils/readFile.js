// @flow

import fs from "fs";

const readFile = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });

export default readFile;
