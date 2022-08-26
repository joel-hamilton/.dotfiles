import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const emailFrom = process.env.EMAIL_FROM_ADDRESS;

export class EmailClient {
  static async send(to: string, subject: string, html: string) {
    if (!awsAccessKeyId) {
      throw new Error("no AWS_ACCESS_KEY_ID");
    }

    if (!awsSecretAccessKey) {
      throw new Error("no AWS_SECRET_ACCESS_KEY");
    }

    if (!emailFrom) {
      throw new Error("no EMAIL_FROM_ADDRESS");
    }

    const client = new SESClient({ region: "ca-central-1" });
    const command = new SendEmailCommand({
      Source: emailFrom,
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
      }
    });

    await client.send(command);
  }
};
