import { IDateTimeClient } from "../services/DateTime";
import { remind, IContext } from "../template-functions";

describe("remind", () => {
  let ctx: IContext;
  beforeEach(() => {
    ctx = {
      fnName: "remind",
      templateFunctionString: "remind(June 2020, Test reminder)",
      param: "June 2020",
      currentValue: "Test reminder",
    };
  });

  test("if reminder time is past, it changes function name to 'reminded'", () => {
    const stubDateTimeClient: IDateTimeClient = (
      dateString: string | Date
    ) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
      isPast: () => true,
    });

    ctx = remind(ctx, stubDateTimeClient);
    expect(ctx.currentValue).toBe("Test reminder");
    expect(ctx.fnName).toBe("reminded");
  });

  test("if reminder time isnot past, it doesn't change function name", () => {
    const stubDateTimeClient: IDateTimeClient = (
      dateString: string | Date
    ) => ({
      isValid: () => true,
      fromNow: () => "in two years",
      isPast: () => false,
    });

    ctx = remind(ctx, stubDateTimeClient);
    expect(ctx.currentValue).toBe("Test reminder");
    expect(ctx.fnName).toBe("remind");
  });
});
