var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const client = require("twilio")(accountSid, authToken);

export class SMSClient {
    static async send(to: string, body: string) {
        console.log("SENDING")
        console.log({to, body})
        client.messages
          .create({
            body,
            to,
            from: "+12369004341",
          })
          .then((message: any) => console.log(message.sid));
    }
}
