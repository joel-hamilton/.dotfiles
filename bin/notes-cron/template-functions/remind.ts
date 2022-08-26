import { IContext, ITemplateFunction } from ".";
import { DateTime, IDateTimeClient } from "../services/DateTime";

// TODO when the date is just a month (or year), just choose a random date within that time period so user isn't inindated with messages
export const remind: ITemplateFunction = (
  ctx: IContext,
  dateTimeClient?: IDateTimeClient
) => {
  const dateTime = new DateTime(dateTimeClient);
  return {
    ...ctx,
    fnName: dateTime.isPast(ctx.param) ? "reminded" : ctx.fnName,
  };
};
