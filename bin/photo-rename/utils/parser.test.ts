import { ExifTool } from "exiftool-vendored";
import { getDateFromExif, getDateFromFileName } from "./parser";

describe("parser", () => {
  describe("getDateFromExif", () => {
    const extool = {
      read() {
        return {
          DateTimeOriginal: {
            rawValue: "2022:02:26 18:02:35",
          },
        };
      },
    };

    test("parse test", async () => {
      expect(
        await getDateFromExif(
          `/test/20220226_180235.jpg`,
          extool as unknown as ExifTool
        )
      ).toBe("20220226_180235");
    });
  });

  describe("getDateFromfileName", () => {
    test("returns same name if already formatted correctly", () => {
      expect(getDateFromFileName("IMG_20200101_010101_sm")).toBe("20200101_010101");
    });

    test("formats string with milliseconds correctly", () => {
      expect(getDateFromFileName("IMG_20200101_010101999_sm")).toBe(
        "20200101_010101"
      );
    });
  });
});
