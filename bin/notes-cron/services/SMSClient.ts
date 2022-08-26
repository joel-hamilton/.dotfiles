const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const twilio = require("twilio");

export class SMSClient {
  static async send(to: string, body: string) {
    if (!accountSid) {
      throw new Error("no TWILIO_ACCOUNT_SID");
    }

    if (!authToken) {
      throw new Error("no TWILIO_AUTH_TOKEN");
    }

    const client = twilio(accountSid, authToken);
    client.messages
      .create({
        body,
        to,
        from: "+12369004341",
      })
      .then((message: any) => console.log(message.sid));
  }
}
