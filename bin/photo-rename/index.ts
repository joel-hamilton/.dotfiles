const promisify = require("util").promisify;
const glob = promisify(require("glob"));
const fs = require("fs");
const path = require("path");
const rename = promisify(fs.rename);
const readline = require("readline");

import { getDateFromExif, getDateFromName } from "./utils";

const run = async (dirPath: string) => {
  const files = await getImages(dirPath);
  if (!(await promptRename(`Rename ${files.length} images?`))) {
    return;
  }

  
};

const getImages = async (dirPath: string): Promise<string[]> => {
  return glob(`${dirPath}/**/*.(CR2|jpg|jpeg)`);
};

const promptRename = (query: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans: string) => {
      rl.close();
      resolve(ans.toLowerCase() === "y");
    })
  );
};

// run('../../../Desktop');
