export type TNofifyRecipient = string;

export interface INotifyClient {
    send: (to: TNofifyRecipient, message: string, opts?: any) => Promise<any>
}

export class Notify {
    notifyClient: INotifyClient;
    constructor(notifyClient: INotifyClient) {
        this.notifyClient = notifyClient;
    }

    async send(to:TNofifyRecipient, message: string) {
        return this.notifyClient.send(to, message);
    }
}