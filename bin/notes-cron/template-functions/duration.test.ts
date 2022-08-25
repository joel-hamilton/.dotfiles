import { IDateTimeClient } from "../services/DateTime";
import { duration, IContext } from "../template-functions";

describe("duration", () => {
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
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
    });
    expect(duration(ctx, stubDateTimeClient).currentValue).toBe(
      "for two years"
    );
  });

  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => duration(ctx, stubDateTimeClient)).toThrowError("Invalid date");
  });
});
