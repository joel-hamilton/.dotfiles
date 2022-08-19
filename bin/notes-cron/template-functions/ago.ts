import { DateTime, IDateTimeClient } from "../services/DateTime";

export const ago = (dateString: string, dateTimeClient?: IDateTimeClient) => {
  const dateTime = new DateTime(dateTimeClient);
  return dateTime.ago(dateString);
};
