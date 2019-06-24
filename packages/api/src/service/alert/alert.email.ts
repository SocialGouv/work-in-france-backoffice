import { Alert, AlertType, getDossierId } from "../../model";
import { Email, EmailAddress } from "../email";
import { getAlertEmailBody } from "./alert.email.body";

const emailAddress: (address: string) => EmailAddress = (address: string) => ({
  email: address,
  name: address
});

const contactWorkInFrance = "contact@workinfrance.beta.gouv.fr";
const bcc = [emailAddress(contactWorkInFrance)];

const subjectUsager = (alert: Alert) =>
  `Erreur sur votre APT WorkInFrance nº${getDossierId(alert.ds_key)} / UD0${
    alert.group.id
  }`;

const alertEmails: {
  [key in AlertType]: (alert: Alert) => Email | undefined;
} = {
  closedWithoutDateDebutOrDateFin: (alert: Alert) => ({
    bcc,
    bodyText: getAlertEmailBody(alert),
    cci: alert.email_instructors.map(emailAddress),
    subject: subjectUsager(alert),
    to: [emailAddress(alert.email_usager)]
  }),

  closedWithDebutSupFin: (alert: Alert) => ({
    bcc,
    bodyText: getAlertEmailBody(alert),
    cci: alert.email_instructors.map(emailAddress),
    subject: subjectUsager(alert),
    to: [emailAddress(alert.email_usager)]
  }),

  closedWithSupOneYear: (alert: Alert) => {
    return {
      bcc,
      bodyText: getAlertEmailBody(alert),
      cci: alert.email_instructors.map(emailAddress),
      subject: subjectUsager(alert),
      to: [emailAddress(alert.email_usager)]
    };
  },

  closedAndMessageReceived: () => undefined,
  refusedAndMessageReceived: () => undefined,
  withoutContinuationAndMessageReceived: () => undefined,

  initiatedAndDelayTooLong: () => undefined,
  receivedAndDelayTooLong: () => undefined

  // closedAndMessageReceived: (alert: Alert) => {
  //   return {
  //     bcc,
  //     bodyText: getAlertEmailBody(alert),
  //     cci: [],
  //     subject: `Un message a été envoyé par l'usager sur le dossier accepté WorkinFrance nº${getDossierId(
  //       alert.ds_key
  //     )}  UD0${alert.group.id}`,
  //     to: alert.instructors_history.map(emailAddress)
  //   };
  // },

  // refusedAndMessageReceived: (alert: Alert) => {
  //   return {
  //     bcc,
  //     bodyText: getAlertEmailBody(alert),
  //     cci: [],
  //     subject: `Un message a été envoyé par l'usager sur le dossier refusé WorkinFrance nº${getDossierId(
  //       alert.ds_key
  //     )}  UD0${alert.group.id}`,
  //     to: alert.instructors_history.map(emailAddress)
  //   };
  // },

  // withoutContinuationAndMessageReceived: (alert: Alert) => {
  //   return {
  //     subject: `Un message a été envoyé par l'usager sur le dossier classé sans suite WorkinFrance nº${getDossierId(
  //       alert.ds_key
  //     )}  UD0${alert.group.id}`,
  //     to: alert.instructors_history.map(emailAddress),
  //     // tslint:disable-next-line: object-literal-sort-keys
  //     bcc,
  //     cci: [],
  //     // tslint:disable-next-line: object-literal-sort-keys
  //     bodyText: getAlertEmailBody(alert)
  //   };
  // },

  // receivedAndDelayTooLong: (alert: Alert) => {
  //   return {
  //     bcc,
  //     bodyText: getAlertEmailBody(alert),
  //     cci: [],
  //     subject: `La durée d'instruction du dossier WorkinFrance nº${getDossierId(
  //       alert.ds_key
  //     )} approche ${alertMaxReceivedTimeInDays} jours / UD0${alert.group.id}`,
  //     to: alert.email_instructors.map(emailAddress)
  //   };
  // },

  // initiatedAndDelayTooLong: (alert: Alert) => {
  //   return {
  //     bcc,
  //     bodyText: getAlertEmailBody(alert),
  //     cci: [],
  //     subject: `La durée de construction du dossier WorkinFrance nº${getDossierId(
  //       alert.ds_key
  //     )} approche ${alertMaxInitiatedTimeInDays} jours / UD0${alert.group.id}`,
  //     to: alert.email_instructors.map((a: string) => emailAddress(a))
  //   };
  // }
};

export const getAlertEmail: (alert: Alert) => Email | undefined = (
  alert: Alert
) => {
  return alertEmails[alert.alert_type](alert);
};
