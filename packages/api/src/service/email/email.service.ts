import { createTransport, SentMessageInfo } from "nodemailer";
import { from, Observable, of } from "rxjs";
import { configuration } from "../../config";
import { logger } from "../../util";

export interface Attachment {
  cid: string;
  filename: string;
  path: string;
}

export interface EmailAddress {
  email: string;
  name: string;
}

export interface Email {
  to: EmailAddress[];
  bcc: EmailAddress[];
  cci: EmailAddress[];
  subject: string;
  bodyText: string;
}

const transporter = createTransport({
  host: configuration.mailHost,
  port: configuration.mailPort,
  secure: configuration.mailUseTLS, // true for 465, false for other ports
  // tslint:disable-next-line: object-literal-sort-keys
  auth: {
    user: configuration.mailUsername,
    // tslint:disable-next-line: object-literal-sort-keys
    pass: configuration.mailPassword
  }
});

const fakeSentMessageInfo = {
  messageId: "fakeSendMessageInfo.messageId"
};

// https://github.com/nodemailer/nodemailer/blob/master/examples/sendmail.js
export const sendEmail: (email: Email) => Observable<SentMessageInfo> = (
  email: Email
) => {
  logger.info(`[EmailService.sendEmail] ${email.subject}`);
  const message = {
    bcc: email.bcc.map((r: EmailAddress) => `${r.name} <${r.email}>`).join(","),
    from: configuration.mailFrom,
    subject: email.subject,
    text: email.bodyText,
    to: email.to.map((r: EmailAddress) => `${r.name} <${r.email}>`).join(",")
  };

  if (configuration.mailEnabled) {
    return from(transporter.sendMail(message));
  }
  logger.info(`[Email] email sending is not enabled.`);
  return of(fakeSentMessageInfo);
};
