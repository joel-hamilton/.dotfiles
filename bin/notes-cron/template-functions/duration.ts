import { ITemplateFunction } from ".";
import { DateTime, IDateTimeClient } from "../services/DateTime";

export const duration:ITemplateFunction = (dateString: string, dateTimeClient?: IDateTimeClient) => {
  const dateTime = new DateTime(dateTimeClient);
  return [dateTime.duration(dateString)];
};
