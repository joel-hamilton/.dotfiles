import path from "path";
import { IContext, ITemplateFunction } from "./template-functions";
import { File } from "./utils/File";
import { executeTemplateFunction, age, ago, duration, remind } from "./template-functions";

export interface IMiddleware {
  (ctx:IContext): IContext;
}

export type TFnDef = [
  functionName: string,
  templateFunction: ITemplateFunction,
  ...middlewares: IMiddleware[]
];

// TODO require dynamically?
const defaultFnDefs: TFnDef[] = [
  ["age", age], // eg: age(July 2020 ~ two years old)
  ["ago", ago], // eg: ago(July 2020 ~ two years ago)
  ["duration", duration], // eg: duration(July 2020 ~ for two year)
  ["remind", remind, (ctx:IContext) => {
    if(ctx.fnName === 'reminded') {
      console.log("SENDING SMS!!!!")
      console.log(ctx);
    }

    return ctx
  }], // eg: remind(July 2023 ~ Message Felix re: new baby) -> reminded(July 2023 ~ Message Felix re: new baby)
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
    let newContent = content;

    for (const [fnName, templateFunction, ...middlewares] of fnDefs) {
      newContent = executeTemplateFunction(
        newContent,
        fnName,
        templateFunction,
        ...middlewares
      );
    }

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
