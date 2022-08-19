import path from "path";
import { ITemplateFunction } from "./template-functions";
import { File } from "./utils/File";
import { String } from "./utils/String";
import {age, ago, duration} from './template-functions'

export type TFnDef = [string, ITemplateFunction];

// TODO require dynamically?
const defaultFnDefs: TFnDef[] = [
  ["age", age],
  ["ago", ago],
  ["duration", duration],
  // TODO add others
  // then add remind(...)
];

export const run = async (notesPath: string, fnDefs: TFnDef[] = defaultFnDefs) => {
  const files = await File.list(path.join(notesPath, "**/*.md"));

  for (const fileName of files) {
    const content = await File.read(fileName);

    // todo chain the function calls
    const newContent = fnDefs.reduce((accContent: string, [fnName, fn]) => {
      return String.executeFunctionTemplate(accContent, fnName, fn);
    }, content);

    // write the file, if content changed
    if (newContent !== content) {
      console.log(`WRITING: ${newContent}`)
      // await File.write(fileName, newContent);
    }
  }
};

console.log('here!')
if (require.main === module) {
  const notesPath = process.argv[2];
  console.log(notesPath)
  if(!notesPath) {
    throw new Error("No notes path");
  }

  run(notesPath)
}