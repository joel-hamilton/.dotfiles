const promisify = require("util").promisify;
const fs = require("fs");
const path = require("path");
const rename = promisify(fs.rename);

import {
  getDateFromExif,
  getDateFromFileName,
  getImageFilePaths,
  promptBoolean,
} from "./utils";

const run = async () => {
  const dirPath = path.resolve(process.argv[2]);
  const dryRun = process.argv[3] === "--dry-run";
  const files = await getImageFilePaths(dirPath);
  if (
    await promptBoolean(
      `${dryRun ? "DRY RUN: " : ""}Rename ${files.length} images? [y/N]`
    )
  ) {
    for (const filePath of files) {
      const dirPath = path.dirname(filePath);
      const extension = path.extname(filePath);
      const fileName = path.basename(filePath, extension);
      const newFileName =
        await getDateFromExif(filePath) || await getDateFromFileName(fileName) || fileName;
      const newFilePath = path.join(dirPath, `${newFileName}${extension}`);
      if (newFilePath !== filePath) {
        console.log(`Renamed: ${filePath}\n\t-> ${newFilePath}`);

        if (!dryRun) {
          await rename(filePath, newFilePath);
        }
      }
    }
  }
};

run();
