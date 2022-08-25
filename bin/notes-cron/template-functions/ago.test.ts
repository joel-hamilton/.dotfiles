import { IDateTimeClient } from "../services/DateTime";
import { ago, IContext } from "../template-functions";

describe("ago", () => {
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

    expect(ago(ctx, stubDateTimeClient).currentValue).toBe("two years ago");
  });

  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (_: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => ago(ctx, stubDateTimeClient)).toThrowError("Invalid date");
  });
});
