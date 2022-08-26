import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// TODO send from tocino.app
export class EmailClient {
  static async send(to: string, subject: string, html: string) {
    if (!awsAccessKeyId) {
      throw new Error("no AWS_ACCESS_KEY_ID");
    }

    if (!awsSecretAccessKey) {
      throw new Error("no AWS_SECRET_ACCESS_KEY");
    }

    const client = new SESClient({ region: "ca-central-1" });
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: to,
    });

    await client.send(command);
  }
};
