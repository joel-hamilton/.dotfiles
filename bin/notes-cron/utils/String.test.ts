import {
  ITemplateFunction,
  TTemplateFunctionReturnValue,
} from "../template-functions";
import { String } from "./String";

describe("String", () => {
  describe("templateFunction", () => {
    const fnName = "doubleupper";
    const testFn = (content: string) => {
      return [(content + content).toUpperCase()] as TTemplateFunctionReturnValue;
    };
    test("it returns the given string if no function exists in it", () => {
      const content =
        "Testing a string with no function calls. But something that looks(like ~ one).";
      expect(String.executeTemplateFunction(content, fnName, testFn)).toBe(
        content
      );
    });

    test("it transforms a template string with no existing value correctly", () => {
      const content = `Testing doubleupper(testString)`;
      const updatedContent = String.executeTemplateFunction(
        content,
        fnName,
        testFn
      );
      expect(updatedContent).toEqual(
        "Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)"
      );
    });

    test("it transforms a template string with an existing value correctly", () => {
      const content = `Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)`;
      const updatedContent = String.executeTemplateFunction(
        content,
        fnName,
        testFn
      );
      expect(updatedContent).toEqual(
        "Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)"
      );
    });

    test("it transforms a template string with special characters correctly", () => {
      const content = `Testing doubleupper(test!@#$%^&*_+String)`;
      const updatedContent = String.executeTemplateFunction(
        content,
        fnName,
        testFn
      );
      expect(updatedContent).toEqual(
        "Testing doubleupper(test!@#$%^&*_+String ~ TEST!@#$%^&*_+STRINGTEST!@#$%^&*_+STRING)"
      );
    });
  });
});
