import fs from "fs";

export default (path: string): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.stat(path, err => (err ? reject(err) : resolve(path)))
  );
