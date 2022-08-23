import { IMiddleware } from "../middlewares";
import { ITemplateFunction } from "../template-functions";

export class String {
  /**
   * Finds and replaces all instances of function template `$fnName($param)`in a string with the $value of invoking $fn with $param. Output formatted like: $fnName($param ~ $value)
   * @param string the text string containing file content
   * @param fnName the name of the function in the string
   * @param fn the actual function to invoke
   */
  static executeTemplateFunction(
    content: string,
    fnName: string,
    fn: ITemplateFunction,
    middlewares?: IMiddleware[]
  ): string {
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
  }
}
