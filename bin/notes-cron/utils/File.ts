const { promisify } = require("util");
const glob = promisify(require("glob"));
const fs = require("fs/promises");

export class File {
  static async list(filePattern: string): Promise<string[]> {
    return glob(filePattern);
  }

  static async read(filePath: string): Promise<string> {
    return fs.readFile(filePath, "utf-8");
  }

  static async write(filePath: string, content: string) {
    await this.checkExists(filePath);
    await fs.writeFile(filePath, content);
  }

  static async checkExists(filePath: string) {
    try {
      await fs.access(filePath);
    } catch (e) {
      throw new Error(
        "File does not exist, or you do not have permission to write to it"
      );
    }
  }
}
