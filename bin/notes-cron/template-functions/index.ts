import { IMiddleware } from "../middlewares";
import { IDateTimeClient } from "../services/DateTime";

export * from "./age";
export * from "./ago";
export * from "./duration";
export * from "./remind";

export type TTemplateFunctionReturnValue =
  [updatedValueString: string, returnValue?: string];
export interface ITemplateFunction {
  (param: string, ...args: any): TTemplateFunctionReturnValue; // TODO make this accept an IDateTimeClient of a TNotifyRecipient
}

export const executeTemplateFunction = (
  content: string,
  fnName: string,
  fn: ITemplateFunction,
  middlewares?: IMiddleware[]
): string => {
  const regex = new RegExp(`${fnName}\\(([^\)]*)\\)`, "g");
  const matches = [...content.matchAll(regex)];
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];

    // full template string from fnName to final paren
    const fullTemplateString = match[0];

    // split param from previous updatedValueString
    const param = match[1].split("~")[0].trim();
    const index = match.index!;
    let updatedValueString;
    let returnValue;

    try {
      [updatedValueString, returnValue] = fn(param);
    } catch (e) {
      console.error(`Error: skipping ${fullTemplateString}`, e);
      continue;
    }

    // create new function template string, eg: fn(param ~ value)
    const newFnString = `${fnName}(${param} ~ ${updatedValueString})`;

    // replace the old function template string
    content =
      content.substring(0, index) +
      newFnString +
      content.substring(index + fullTemplateString.length);
  }

  return content;
};
