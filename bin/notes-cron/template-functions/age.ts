import { IContext, ITemplateFunction } from ".";
import { DateTime, IDateTimeClient } from "../services/DateTime";

export const age: ITemplateFunction = (
  ctx: IContext,
  dateTimeClient?: IDateTimeClient
) => {
  const dateTime = new DateTime(dateTimeClient);
  return { ...ctx, currentValue: dateTime.age(ctx.param) };
};
