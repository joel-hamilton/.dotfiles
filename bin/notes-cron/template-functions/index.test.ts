import {
  executeTemplateFunction,
  IContext,
  ITemplateFunction,
} from "../template-functions";

describe("String", () => {
  describe("templateFunction", () => {
    const fnName = "doubleupper";
    const testFn: ITemplateFunction = (ctx: IContext) => {
      return {
        ...ctx,
        currentValue: (ctx.param + ctx.param).toUpperCase(),
      };
    };
    test("it returns the given string if no function exists in it", () => {
      const content =
        "Testing a string with no function calls. But something that looks(like ~ one).";
      expect(executeTemplateFunction(content, fnName, testFn)).toBe(content);
    });

    test("it transforms a template string with no existing value correctly", () => {
      const content = `Testing doubleupper(testString)`;
      const updatedContent = executeTemplateFunction(content, fnName, testFn);
      expect(updatedContent).toEqual(
        "Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)"
      );
    });

    test("it transforms a template string with an existing value correctly", () => {
      const content = `Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)`;
      const updatedContent = executeTemplateFunction(content, fnName, testFn);
      expect(updatedContent).toEqual(
        "Testing doubleupper(testString ~ TESTSTRINGTESTSTRING)"
      );
    });

    test("it transforms a template string with special characters correctly", () => {
      const content = `Testing doubleupper(test!@#$%^&*_+String)`;
      const updatedContent = executeTemplateFunction(content, fnName, testFn);
      expect(updatedContent).toEqual(
        "Testing doubleupper(test!@#$%^&*_+String ~ TEST!@#$%^&*_+STRINGTEST!@#$%^&*_+STRING)"
      );
    });

    test("it calls first middleware with template function return value", () => {
      const middlewareSpy = jest.fn((ctx) => ctx);
      const content = "test content doubleupper(test)";
      executeTemplateFunction(content, fnName, testFn, [middlewareSpy]);

      expect(middlewareSpy).toHaveBeenCalledTimes(1);
      expect(middlewareSpy).toHaveBeenCalledWith(
        expect.objectContaining({ currentValue: "TESTTEST" })
      );
    });

    test("it calls subsequent middlewares with previous middleware return value", () => {
      const middlewareSpy1 = jest.fn((ctx) => ({
        ...ctx,
        currentValue: ctx.currentValue.toLowerCase(),
      }));
      const middlewareSpy2 = jest.fn((ctx) => ctx);
      const content = "test content doubleupper(test)";
      executeTemplateFunction(content, fnName, testFn, [
        middlewareSpy1,
        middlewareSpy2,
      ]);

      // TODO expect only on the currentValue of ctx
      expect(middlewareSpy1).toHaveBeenCalledTimes(1);
      expect(middlewareSpy1).toHaveBeenCalledWith(
        expect.objectContaining({ currentValue: "TESTTEST" })
      );

      expect(middlewareSpy2).toHaveBeenCalledTimes(1);
      expect(middlewareSpy2).toHaveBeenCalledWith(
        expect.objectContaining({ currentValue: "testtest" })
      );
    });
  });
});
