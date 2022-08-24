import { IContext, ITemplateFunction } from ".";
import { DateTime, IDateTimeClient } from "../services/DateTime";

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
