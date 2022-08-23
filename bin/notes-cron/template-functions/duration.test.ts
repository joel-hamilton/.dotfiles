import { IDateTimeClient } from "../services/DateTime";
import { duration } from "../template-functions";

describe("duration", () => {
  test("it returns the correct duration string with valid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
    });
    expect(duration("June 2022", stubDateTimeClient)[0]).toBe("for two years");
  });


  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => duration("June 2022", stubDateTimeClient)).toThrow(
      new Error("Invalid date")
    );
  });
});
