import { INotifyClient, Notify, TNofifyRecipient } from "./Notify";
describe("Notify", () => {
  let sendSpy = jest.fn();
  let stubNotifyClient: INotifyClient;

  beforeEach(() => {
    stubNotifyClient = {
      send: sendSpy,
    };
  });

  test("calls the notifyClient with the correct params", () => {
    const notify = new Notify(stubNotifyClient);
    expect(sendSpy).not.toHaveBeenCalled();
    notify.send("test@amil.com", "message");
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith("test@amil.com", "message");
  });
});
