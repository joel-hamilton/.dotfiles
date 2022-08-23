import { IDateTimeClient } from "../services/DateTime";
import { TNofifyRecipient } from "../services/Notify";

export * from "./age";
export * from "./ago";
export * from "./duration";
export * from "./remind";
export interface ITemplateFunction {
  (param: string, ...args: any): string; // TODO make this accept an IDateTimeClient of a TNotifyRecipient
}
