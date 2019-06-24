import { addDays, format } from "date-fns";
import {
  Alert,
  alertMaxInitiatedTimeInDays,
  alertMaxReceivedTimeInDays,
  AlertType,
  getDossierId
} from "../../model";

const bonjour = `Bonjour,`;

const emailSignature = `Bonne journée,


L'équipe WorkInFrance


—


Merci de ne pas répondre à cet email`;

// tslint:disable-next-line: max-line-length
const referenceArticle242 = `Selon l'article L.242-1 du Code des relations entre le public et l'administration (https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000031366350&idArticle=LEGIARTI000031367657&dateTexte=&categorieLien=cid) l'administration ne peut revenir sur une décision créatrice de droits. Ainsi, les agents du service de main oeuvre étrangère de la Direccte ne peuvent revenir sur cette décision.`;

// tslint:disable-next-line: max-line-length
const referenceArticle5221 = `Selon l'alinéa 14 de l'article R.5221-3 du Code du travail (https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000038189414&cidTexte=LEGITEXT000006072050&dateTexte=20190301) une autorisation provisoire de travail a une durée maximale de douze mois.`;

// tslint:disable-next-line: max-line-length
const delayTooLongAdvice = `Si vous avez demandé des pièces complémentaires à l'usager en lui ayant indiqué une date limite de réponse, et que ce dernier tarde à vous répondre, vous pouvez :

- Dans un premier temps, relancer l'usager ;
- A l'issue de la date limite indiquée, prendre une décision sur le dossier en l'état`;

const alertEmailBody: { [key in AlertType]: (alert: Alert) => string } = {
  // tslint:disable-next-line: max-line-length
  closedWithoutDateDebutOrDateFin: (
    alert: Alert
  ) => `Nous avons identifié une erreur sur votre autorisation provisoire de travail nº${getDossierId(
    alert.ds_key
  )}. En effet, il n'y a pas de date de début et/ou de date de fin sur votre autorisation qui, par conséquent, n'est pas valide.

${referenceArticle242}

Nous vous suggérons de déposer un nouveau dossier le plus rapidement possible.`,

  closedWithDebutSupFin: (
    alert: Alert
  ) => `Nous avons identifié une erreur sur votre autorisation provisoire de travail n°${getDossierId(
    alert.ds_key
    // tslint:disable-next-line: max-line-length
  )}. En effet, la date de fin est antérieure à la date de début de votre autorisation qui, par conséquent, n'est pas valide.

${referenceArticle242}

Nous vous suggérons de déposer un nouveau dossier le plus rapidement possible.`,

  closedWithSupOneYear: (alert: Alert) => {
    const aptDateDebutPlus330Days = format(
      addDays(alert.date_debut_apt, 330),
      "DD/MM/YYYY"
    );
    return `Nous avons identifié une erreur sur votre autorisation provisoire de travail n°${getDossierId(
      alert.ds_key
      // tslint:disable-next-line: max-line-length
    )}. En effet, la durée de votre autorisation est supérieure à 12 mois.

${referenceArticle5221}

Nous vous suggérons de déposer un nouveau dossier à partir du ${aptDateDebutPlus330Days}`;
  },

  closedAndMessageReceived: (alert: Alert) => messageReceived(alert),

  refusedAndMessageReceived: (alert: Alert) => messageReceived(alert),

  withoutContinuationAndMessageReceived: (alert: Alert) =>
    messageReceived(alert),

  initiatedAndDelayTooLong: (
    alert: Alert
  ) => `La durée de construction du dossier WorkinFrance n°${getDossierId(
    alert.ds_key
  )} approche ${alertMaxInitiatedTimeInDays} jours.

  ${delayTooLongAdvice}.`,

  receivedAndDelayTooLong: (
    alert: Alert
  ) => `La durée d'instruction du dossier WorkinFrance n°${getDossierId(
    alert.ds_key
  )} approche ${alertMaxReceivedTimeInDays} jours.

  ${delayTooLongAdvice}.`
};

function messageReceived(alert: Alert) {
  let status = "";
  if (alert.alert_type === "closedAndMessageReceived") {
    status = "accepté";
  } else if (alert.alert_type === "refusedAndMessageReceived") {
    status = "refusé";
  } else {
    status = "classé sans suite";
  }
  // tslint:disable-next-line: max-line-length
  const messageReceivedAdvice = `Nous vous suggérons de vous connecter à votre compte Démarches-Simplifiées afin d'identifier un éventuel problème ou une erreur de saisie de l'usager.`;
  // tslint:disable-next-line: max-line-length
  const messageReceivedAdvice2 = `S'il s'agit d'un problème de saisie, la solution est d'inviter l'usager à déposer une nouvelle demande. En effet, ${referenceArticle242}`;
  return `Un message a été envoyé par l'usager sur le dossier ${status} n°${getDossierId(
    alert.ds_key
  )} dans la messagerie interne de Démarches-Simplifiées.

${messageReceivedAdvice}

${messageReceivedAdvice2}`;
}

export const getAlertEmailBody = (alert: Alert) => {
  const body = alertEmailBody[alert.alert_type](alert);
  return `${bonjour}

${body}

${emailSignature}`;
};
