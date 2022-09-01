import { ExifTool } from "exiftool-vendored";
import { getDateFromExif } from "./getDateFromExif";

const getMockExifTool = (readReturn: any) => {
  return {
    read: () => readReturn,
  };
};

describe("getDateFromExif", () => {
  test("it should correctly parse DateTimeOriginal object", async () => {
    const exiftool = getMockExifTool({
      DateTimeOriginal: {
        rawValue: "2022:02:26 18:02:35",
      },
    });

    expect(
      await getDateFromExif(
        `/test/20220226_180235.jpg`,
        exiftool as unknown as ExifTool
      )
    ).toBe("20220226_180235");
  });

  test("it should correctly parse DateTimeOriginal string", async () => {
    const exiftool = getMockExifTool({
      DateTimeOriginal: "2017-02-20T18:06:40.000",
    });

    expect(
      await getDateFromExif(
        `/test/20220226_180235.jpg`,
        exiftool as unknown as ExifTool
      )
    ).toBe("20170220_180640");
  });

  test("it should correctly parse MediaCreateDate object if no DateTimeOriginal", async () => {
    const exiftool = getMockExifTool({
      MediaCreateDate: {
        rawValue: "2022:02:26 18:02:35",
      },
    });

    expect(
      await getDateFromExif(
        `/test/20220226_180235.jpg`,
        exiftool as unknown as ExifTool
      )
    ).toBe("20220226_180235");
  });

  test("it should return undefined datetime parsing fails", async () => {
    const exiftool = getMockExifTool({
      DateTimeOriginal: "invalid",
    });

    expect(
      await getDateFromExif(
        `/test/20220226_180235.jpg`,
        exiftool as unknown as ExifTool
      )
    ).toBeUndefined();
  });
});
