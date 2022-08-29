import { ExifDateTime, exiftool } from "exiftool-vendored";
import { DateTime } from "luxon";
import path from "path";

const dateFormat = "yyyyMMdd_HHmmss";

export const getDateFromExif = async (filePath: string, extool = exiftool) => {
  const exifInfo = await extool.read(filePath);
  if (exifInfo && exifInfo.DateTimeOriginal) {
    const dateString = (exifInfo.DateTimeOriginal as ExifDateTime).rawValue!;
    return DateTime.fromFormat(dateString, "yyyy:MM:dd HH:mm:ss").toFormat(
      dateFormat
    );
  }
};

export const getDateFromName = (filePath: string) => {
  const fileExtension = path.extname(filePath);
  const filename = path.basename(filePath, fileExtension);
  const sanitizedFilename = filename
    .replace(/[^\d_]/g, "")
    .replace(/^_*/g, "")
    .replace(/_*$/g, "");

  if (/^\d{8}_\d{6}$/.test(sanitizedFilename)) {
    return sanitizedFilename;
  }

  if (/\d{8}_\d{9}/.test(sanitizedFilename)) {
    return DateTime.fromFormat(
      sanitizedFilename,
      "yyyyMMdd_HHmmssSSS"
    ).toFormat(dateFormat);
  }
};
