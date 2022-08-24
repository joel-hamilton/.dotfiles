import { IContext, ITemplateFunction } from ".";
import { IDateTimeClient } from "../services/DateTime";

export const remind: ITemplateFunction = (
  ctx: IContext,
  dateTimeClient?: IDateTimeClient
) => {
  return ctx;
};
