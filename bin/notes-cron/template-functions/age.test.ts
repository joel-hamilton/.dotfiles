import { IDateTimeClient } from "../services/DateTime";
import { age } from "../template-functions";

describe("age", () => {
  test("it returns the correct duration string with valid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => true,
      fromNow: () => "two years ago",
    });
    expect(age("June 2022", stubDateTimeClient)).toBe("two years old");
  });


  test("it returns the correct duration string with invalidvalid date", () => {
    const stubDateTimeClient: IDateTimeClient = (dateString: string) => ({
      isValid: () => false,
      fromNow: () => "two years ago",
    });
    expect(() => age("June 2022", stubDateTimeClient)).toThrow(
      new Error("Invalid date")
    );
  });
});
