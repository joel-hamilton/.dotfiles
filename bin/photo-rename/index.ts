const promisify = require("util").promisify;
const fs = require("fs");
const path = require("path");
const rename = promisify(fs.rename);

import {
  getDateFromExif,
  getFilePaths,
  fileExists,
  promptBoolean,
} from "./utils";

const run = async () => {
  const dirPath = path.resolve(process.argv[2]);
  const dryRun = process.argv[3] === "--dryRun";
  const files = await getFilePaths(dirPath);
  if (
    await promptBoolean(
      `${dryRun ? "DRY RUN: " : ""}Rename ${files.length} images? [y/N]`
    )
  ) {
    for (const filePath of files) {
      const dirPath = path.dirname(filePath);
      const extension = path.extname(filePath);
      const fileName = path.basename(filePath, extension);

      try {
        const newFileName = (await getDateFromExif(filePath)) || fileName;
        let newFilePath = path.join(dirPath, `${newFileName}${extension}`);
        let integer = 0;
        if (newFilePath !== filePath) {
          // find next unique filename
          while(await fileExists(newFilePath)) {
            newFilePath = path.join(dirPath, `${newFileName}.${++integer}${extension}`);
          }

          console.log(`Renaming: ${filePath}\n\t-> ${newFilePath}`);
          if (!dryRun) {
            await rename(filePath, newFilePath);
          }
        }
      } catch (e) {
        console.log(e);
        continue;
      }
    }
  }
};

run();
