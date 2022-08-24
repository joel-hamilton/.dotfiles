import { DateTime, IDateTimeClient } from "./DateTime";

describe("DateTime", () => {
  describe("invalid dates", () => {
    let stubDateTimeClient: IDateTimeClient;

    beforeEach(() => {
      stubDateTimeClient = jest.fn((dateString: string) => ({
        isValid: () => false,
        fromNow: () => "",
      }));
    });

    test("ago throws an error with an invalid date", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(() => dateTime.ago("invalid date")).toThrowError("Invalid date");
    });

    test("age throws an error with an invalid date", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(() => dateTime.age("invalid date")).toThrowError("Invalid date");
    });

    test("duration throws an error with an invalid date", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(() => dateTime.duration("invalid date")).toThrowError(
        "Invalid date"
      );
    });

    test("duration throws an error with an invalid date", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(() => dateTime.isPast("invalid date")).toThrowError(
        "Invalid date"
      );
    });
  });

  describe("valid dates", () => {
    let stubDateTimeClient: IDateTimeClient;

    beforeEach(() => {
      stubDateTimeClient = jest.fn((dateString: string) => ({
        isValid: () => true,
        fromNow: () => "two years ago",
      }));
    });

    test("age correctly outputs string", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(dateTime.age("July 2020")).toBe("two years old");
    });

    test("ago correctly outputs string", () => {
      const dateTime = new DateTime(stubDateTimeClient);
      expect(dateTime.duration("July 2020")).toBe("for two years");
    });
  });
});
