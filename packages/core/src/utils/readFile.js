import fs from "fs";

const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file.toString());
      }
    });
  });

export default readFile;
