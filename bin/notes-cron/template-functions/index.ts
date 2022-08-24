import { IMiddleware } from "../index";
import { IDateTimeClient } from "../services/DateTime";

export * from "./age";
export * from "./ago";
export * from "./duration";
export * from "./remind";

export interface IContext {
  fnName: string;
  templateFunctionString: string;
  param: string; // param before the ~
  currentValue: string; // after the ~
}

export interface ITemplateFunction {
  (ctx: IContext, dateTimeClient?:IDateTimeClient): IContext;
}

export const executeTemplateFunction = (
  content: string,
  fnName: string,
  templateFunction: ITemplateFunction,
  middlewares?: IMiddleware[]
): string => {
  const regex = new RegExp(`${fnName}\\(([^\)]*)\\)`, "g");
  const matches = [...content.matchAll(regex)];
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];

    // full template string from fnName to final paren
    const templateFunctionString = match[0];

    // split param from previous updatedValueString
    const [param, currentValue] = match[1].split("~");
    const index = match.index!;
    let updatedValueString;
    let returnValue;

    // TODO pass this context object into template function and to each middleware, allowing them to modify it
    let ctx:IContext = {
      fnName,
      templateFunctionString,
      param: param.trim(),
      currentValue: (currentValue || "").trim(),
    }

    try {
      ctx = templateFunction(ctx);

      for (const middleware of middlewares || []) {
        ctx = middleware(ctx);
      }
    } catch (e) {
      console.error(`Error: skipping ${templateFunctionString}`, e);
      continue;
    }

    // create new function template string, eg: fn(param ~ value)
    const newTemplateFunctionString = `${ctx.fnName}(${ctx.param} ~ ${ctx.currentValue})`;

    // replace the old function template string
    content =
      content.substring(0, index) +
      newTemplateFunctionString +
      content.substring(index + templateFunctionString.length);
  }

  return content;
};
