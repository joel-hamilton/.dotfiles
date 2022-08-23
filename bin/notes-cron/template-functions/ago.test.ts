import { IDateTimeClient } from "../services/DateTime";
import { ago } from "../template-functions";

describe("ago", () => {
  test("it returns the correct duration string with valid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
    });
    expect(ago("June 2022", stubDateTimeClient)[0]).toBe("two years ago");
  });


  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => ago("June 2022", stubDateTimeClient)).toThrow(
      new Error("Invalid date")
    );
  });
});
