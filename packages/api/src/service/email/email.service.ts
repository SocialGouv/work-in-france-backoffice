import { createTransport, SentMessageInfo } from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
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
  attachments?: Attachment[];
}

export const transporter = createTransport({
  host: configuration.mailHost,
  port: configuration.mailPort,
  // secure: configuration.mailUseTLS, // true for 465, false for other ports
  // tslint:disable-next-line: object-literal-sort-keys
  auth: {
    user: configuration.mailUsername,
    // tslint:disable-next-line: object-literal-sort-keys
    pass: configuration.mailPassword,
  },
});

const fakeSentMessageInfo = {
  messageId: "fakeSendMessageInfo.messageId",
};

// https://github.com/nodemailer/nodemailer/blob/master/examples/sendmail.js
export const sendEmail: (email: Email) => Observable<SentMessageInfo> = (
  email: Email
) => {
  logger.info(`[EmailService.sendEmail] ${email.subject}`);
  const { bcc = [], subject, bodyText, to } = email;
  const message: Options = {
    cc: bcc.map((r: EmailAddress) => `"${r.name}" <${r.email}>`).join(","),
    from: configuration.mailFrom,
    subject,
    text: bodyText,
    to: to.map((r: EmailAddress) => `${r.name} <${r.email}>`).join(","),
  };

  if (email.attachments) {
    message.attachments = email.attachments.map((a: Attachment) => ({
      cid: a.path, // should be as unique as possible
      filename: a.filename,
      path: a.path,
    }));
  }

  if (configuration.mailEnabled) {
    return from(transporter.sendMail(message));
  }
  logger.info(`[Email] email sending is not enabled.`);
  return of(fakeSentMessageInfo);
};
