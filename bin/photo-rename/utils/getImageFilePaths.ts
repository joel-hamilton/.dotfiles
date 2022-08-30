const promisify = require("util").promisify;
const glob = promisify(require("glob"));

export const getImageFilePaths = async (dirPath: string): Promise<string[]> => {
  return glob(`${dirPath}/**/*.jpg`);
};