import { ITemplateFunction } from ".";
import { TNofifyRecipient, Notify, INotifyClient } from "../services/Notify";

export const remind:ITemplateFunction = (dateString: string, to: TNofifyRecipient, notifyClient: INotifyClient) => {
  return ['test', 'test'];
};
