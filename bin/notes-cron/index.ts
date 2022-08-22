import path from "path";
import { ITemplateFunction } from "./template-functions";
import { File } from "./utils/File";
import { String } from "./utils/String";
import { age, ago, duration, remind } from "./template-functions";

export type TFnDef = [string, ITemplateFunction];

// TODO require dynamically?
const defaultFnDefs: TFnDef[] = [
  ["age", age],
  ["ago", ago],
  ["duration", duration],
  ["remind", remind],
  // TODO add others
  // then add remind(...)
];

export const run = async (
  notesPath: string,
  fnDefs: TFnDef[] = defaultFnDefs
) => {
  const files = await File.list(path.join(notesPath, "**/*.md"));

  for (const fileName of files) {
    const content = await File.read(fileName);

    // todo chain the function calls
    const newContent = fnDefs.reduce((accContent: string, [fnName, fn]) => {
      return String.executeFunctionTemplate(accContent, fnName, fn);
    }, content);

    // write the file, if content changed
    if (newContent !== content) {
      console.log(`WRITING: ${newContent}`);
      await File.write(fileName, newContent);
    }
  }
};

// run from command line
if (require.main === module) {
  const notesPath = process.argv[2];
  const email = process.argv[3];
  const phoneNumber = process.argv[4];
  console.log({ notesPath, email, phoneNumber });
  if (!notesPath) {
    throw new Error("No notes path");
  }

  if (!email) {
    throw new Error("No email");
  }

  if (!phoneNumber) {
    throw new Error("No phone number");
  }

  run(notesPath);
}
