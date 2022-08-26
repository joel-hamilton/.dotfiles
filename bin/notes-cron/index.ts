import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import { IContext, ITemplateFunction } from "./template-functions";
import { File } from "./utils/File";
import {
  executeTemplateFunction,
  age,
  ago,
  duration,
  remind,
} from "./template-functions";
import { SMSClient } from "./services/SMSClient";
import { DailyDigest } from "./services/DailyDigest";

export interface IMiddleware {
  (ctx: IContext): IContext;
}

export type TFnDef = [
  functionName: string,
  templateFunction: ITemplateFunction,
  ...middlewares: IMiddleware[]
];

const getDefaultFnDefs = (email: string, phoneNumber: string): TFnDef[] => [
  ["age", age], // eg: age(July 2020 ~ two years old)
  ["ago", ago], // eg: ago(July 2020 ~ two years ago)
  ["duration", duration], // eg: duration(July 2020 ~ for two year)
  [
    "remind",
    remind,
    (ctx: IContext) => {
      if (ctx.fnName === "reminded") {
        SMSClient.send(phoneNumber, `Reminder: ${ctx.currentValue}`);
      }

      return ctx;
    },
  ], // eg: remind(July 2023 ~ Message Felix re: new baby) -> reminded(July 2023 ~ Message Felix re: new baby)
];

export const run = async (
  notesPath: string,
  email: string,
  phoneNumber: string,
  fnDefs: TFnDef[] = getDefaultFnDefs(email, phoneNumber)
) => {
  const notesPathGlob = path.join(notesPath, "**/*.md");

  const runTemplateFunctions = async () => {
    const files = await File.list(notesPathGlob);

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
        await File.write(fileName, newContent);
      }
    }
  };

  const runDailyDigest = async () => {
    const dd = new DailyDigest(notesPathGlob, email);
    return dd.run();
  };

  try {
    await runTemplateFunctions();
    await runDailyDigest();
    console.log(`${new Date()}:" Finished running notes cron`);
  } catch (e) {
    console.error(`Encountered an error running cron tasks: '${e}'`);
    throw e;
  }
};

// run from command line
if (require.main === module) {
  const notesPath = process.env.NOTES_PATH;
  const email = process.env.EMAIL_TO_ADDRESS;
  const phoneNumber = process.env.PHONE_NUMBER;

  if (!notesPath) {
    throw new Error("No notes path");
  }

  if (!email) {
    throw new Error("No email");
  }

  if (!phoneNumber) {
    throw new Error("No phone number");
  }

  run(notesPath, email, phoneNumber);
}
