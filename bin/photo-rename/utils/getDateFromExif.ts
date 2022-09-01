import { exiftool, Tags } from "exiftool-vendored";
import { DateTime } from "luxon";

const dateFormat = "yyyyMMdd_HHmmss";

export const getDateFromExif = async (filePath: string, extool = exiftool) => {
  const exifInfo = await extool.read(filePath);
  return getDateFrom(exifInfo, ["DateTimeOriginal", "MediaCreateDate"]);
};

// todo make exifInfo of type Tags
const getDateFrom = (exifInfo: any, tags: string[]) => {
  for (const tag of tags) {
    let dateTime, dateString;
    if (exifInfo[tag] && typeof exifInfo[tag] === "string") {
      dateString = exifInfo[tag];
      dateTime = DateTime.fromISO(dateString);
    } else if (exifInfo[tag] && typeof exifInfo[tag] === "object") {
      dateString = exifInfo[tag].rawValue;
      dateTime = DateTime.fromFormat(
        dateString || "",
        "yyyy:MM:dd HH:mm:ss"
      );
    }

    if (dateTime) {
      if (dateTime.isValid) {
        return dateTime.toFormat(dateFormat);
      }

      console.log(`Problem parsing ${dateString}`);
    }
  }
};
