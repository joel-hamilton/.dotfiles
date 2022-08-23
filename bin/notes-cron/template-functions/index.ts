import { IDateTimeClient } from "../services/DateTime";

export * from "./age";
export * from "./ago";
export * from "./duration";
export * from "./remind";

export type TTemplateFunctionReturnValue =
  [updatedValueString: string, returnValue?: string];
export interface ITemplateFunction {
  (param: string, ...args: any): TTemplateFunctionReturnValue; // TODO make this accept an IDateTimeClient of a TNotifyRecipient
}
