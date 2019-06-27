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
  message: "ALERT_MESSAGE",
  processed_at: 0,
  state: "initiated"
};

it("email of alert should be equal to", () => {
  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithDebutSupFin" })
  ).toMatchSnapshot();

  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithoutDateDebutOrDateFin" })
  ).toMatchSnapshot();

  expect(
    getAlertEmail({ ...alert, alert_type: "closedWithSupOneYear" })
  ).toMatchSnapshot();

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
