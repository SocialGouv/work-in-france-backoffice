import { Alert } from "../../../../src/model";
import { getAlertEmail } from "../../../../src/service";

const alert: Alert = {
  url: "URL",
  // tslint:disable-next-line: object-literal-sort-keys
  group: {
    id: "75",
    label: "75 - Paris"
  },
  ds_key: "14131-502017",
  alert_type: "closedWithDebutSupFin",
  email_usager: "usager@wif.fr",
  date_debut_apt: "2019-01-01",
  email_instructors: [
    "instructor2@direccte.gouv.fr",
    "instructor3@direccte.gouv.fr"
  ],
  instructors_history: [
    "instructor1@direccte.gouv.fr",
    "instructor2@direccte.gouv.fr",
    "instructor3@direccte.gouv.fr"
  ],
  message: "ALERT_MESSAGE"
};

it("email of alert should be equal to", () => {
  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithDebutSupFin" })
  ).toEqual({
    to: [
      {
        email: "usager@wif.fr",
        name: "usager@wif.fr"
      }
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    bcc: [
      {
        email: "contact@workinfrance.beta.gouv.fr",
        name: "contact@workinfrance.beta.gouv.fr"
      }
    ],
    cci: [
      {
        email: "instructor2@direccte.gouv.fr",
        name: "instructor2@direccte.gouv.fr"
      },
      {
        email: "instructor3@direccte.gouv.fr",
        name: "instructor3@direccte.gouv.fr"
      }
    ],
    subject: "Erreur sur votre APT WorkInFrance nº502017 / UD075",
    bodyText:
      "Bonjour,\n\nNous avons identifié une erreur sur votre autorisation provisoire de travail n°502017. En effet, la date de fin est antérieure à la date de début de votre autorisation qui, par conséquent, n'est pas valide.\n\nSelon l'article L.242-1 du Code des relations entre le public et l'administration (https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000031366350&idArticle=LEGIARTI000031367657&dateTexte=&categorieLien=cid) l'administration ne peut revenir sur une décision créatrice de droits. Ainsi, les agents du service de main oeuvre étrangère de la Direccte ne peuvent revenir sur cette décision.\n\nNous vous suggérons de déposer un nouveau dossier le plus rapidement possible.\n\nBonne journée,\n\n\nL'équipe WorkInFrance\n\n\n—\n\n\nMerci de ne pas répondre à cet email"
  });

  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithoutDateDebutOrDateFin" })
  ).toEqual({
    to: [
      {
        email: "usager@wif.fr",
        name: "usager@wif.fr"
      }
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    bcc: [
      {
        email: "contact@workinfrance.beta.gouv.fr",
        name: "contact@workinfrance.beta.gouv.fr"
      }
    ],
    cci: [
      {
        email: "instructor2@direccte.gouv.fr",
        name: "instructor2@direccte.gouv.fr"
      },
      {
        email: "instructor3@direccte.gouv.fr",
        name: "instructor3@direccte.gouv.fr"
      }
    ],
    subject: "Erreur sur votre APT WorkInFrance nº502017 / UD075",
    bodyText:
      "Bonjour,\n\nNous avons identifié une erreur sur votre autorisation provisoire de travail nº502017. En effet, il n'y a pas de date de début et/ou de date de fin sur votre autorisation qui, par conséquent, n'est pas valide.\n\nSelon l'article L.242-1 du Code des relations entre le public et l'administration (https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000031366350&idArticle=LEGIARTI000031367657&dateTexte=&categorieLien=cid) l'administration ne peut revenir sur une décision créatrice de droits. Ainsi, les agents du service de main oeuvre étrangère de la Direccte ne peuvent revenir sur cette décision.\n\nNous vous suggérons de déposer un nouveau dossier le plus rapidement possible.\n\nBonne journée,\n\n\nL'équipe WorkInFrance\n\n\n—\n\n\nMerci de ne pas répondre à cet email"
  });

  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithSupOneYear" })
  ).toEqual({
    to: [
      {
        email: "usager@wif.fr",
        name: "usager@wif.fr"
      }
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    bcc: [
      {
        email: "contact@workinfrance.beta.gouv.fr",
        name: "contact@workinfrance.beta.gouv.fr"
      }
    ],
    cci: [
      {
        email: "instructor2@direccte.gouv.fr",
        name: "instructor2@direccte.gouv.fr"
      },
      {
        email: "instructor3@direccte.gouv.fr",
        name: "instructor3@direccte.gouv.fr"
      }
    ],
    subject: "Erreur sur votre APT WorkInFrance nº502017 / UD075",
    bodyText:
      "Bonjour,\n\nNous avons identifié une erreur sur votre autorisation provisoire de travail n°502017. En effet, la durée de votre autorisation est supérieure à 12 mois.\n\nSelon l'alinéa 14 de l'article R.5221-3 du Code du travail (https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000038189414&cidTexte=LEGITEXT000006072050&dateTexte=20190301) une autorisation provisoire de travail a une durée maximale de douze mois.\n\nNous vous suggérons de déposer un nouveau dossier à partir du 27/11/2019\n\nBonne journée,\n\n\nL'équipe WorkInFrance\n\n\n—\n\n\nMerci de ne pas répondre à cet email"
  });

  expect(
    getAlertEmail({ ...alert, alert_type: "initiatedAndDelayTooLong" })
  ).toBeUndefined();

  expect(
    getAlertEmail({ ...alert, alert_type: "receivedAndDelayTooLong" })
  ).toBeUndefined();

  expect(
    getAlertEmail({ ...alert, alert_type: "closedAndMessageReceived" })
  ).toBeUndefined();

  expect(
    getAlertEmail({ ...alert, alert_type: "refusedAndMessageReceived" })
  ).toBeUndefined();

  expect(
    getAlertEmail({
      ...alert,
      alert_type: "withoutContinuationAndMessageReceived"
    })
  ).toBeUndefined();
});
