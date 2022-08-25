import { IDateTimeClient } from "../services/DateTime";
import { age, IContext } from "../template-functions";

describe("age", () => {
  let ctx: IContext;

    beforeEach(() => {
      ctx = {
        fnName: "ago",
        templateFunctionString: "ago(June 2020)",
        param: "June 2020",
        currentValue: "",
      };
    });
  test("it returns the correct duration string with valid date", () => {
    const stubDateTimeClient: IDateTimeClient = (_: string) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
    });
    expect(age(ctx, stubDateTimeClient).currentValue).toBe("two years old");
  });


  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (_: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => age(ctx, stubDateTimeClient)).toThrowError("Invalid date");
  });
});
