const promisify = require("util").promisify;
const fs = require("fs");
const glob = promisify(require("glob"));
const access = promisify(fs.access);

export const getFilePaths = async (
  dirPath: string,
  extensions: string[] = [
    "jpg",
    "jpeg",
    "JPG",
    "JPEG",
    "cr2",
    "CR2",
    "mov",
    "MOV",
    "mp4",
    "MP4",
  ]
): Promise<string[]> => {
  return glob(`${dirPath}/**/*.{${extensions.join(",")}}`);
};

export const fileExists = async (filePath: string) => {
  try {
    await access(filePath);
    return true;
  } catch (e) {
    return false;
  }
};
