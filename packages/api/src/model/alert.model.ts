import { Email } from "../service";
import { IIdentifiable } from "../util";
import { DSGroup } from "./dossier-record.model";

export type AlertType =
  | "closedWithoutDateDebut"
  | "closedWithoutDateFin"
  | "closedWithDebutSupFin"
  | "closedWithSupOneYear"
  | "closedAndMessageReceived"
  | "refusedAndMessageReceived"
  | "withoutContinuationAndMessageReceived"
  | "receivedAndDelayTooLong"
  | "initiatedAndDelayTooLong";

export interface Alert extends IIdentifiable {
  ds_key: string;
  url: string;
  group: DSGroup;
  alert_type: AlertType;
  message: string;
  instructors_history: string[];
  email_id?: string;
  email_usager: string;
  email_instructors: string[];
  date_debut_apt: string;
  email?: Email;
  sent: boolean;
}

export interface AlertMessage {
  message: string;
}

export const alertMaxReceivedTimeInDays = 7;
export const alertMaxInitiatedTimeInDays = 7;

export const alertMessages = {
  closedWithoutDateDebut: "dossier accepté, date de début APT manquante",
  closedWithoutDateFin: "dossier accepté, date de fin APT manquante",
  // tslint:disable-next-line: object-literal-sort-keys
  closedWithDebutSupFin:
    "dossier accepté, date de fin APT antérieure à Date de début APT",
  closedWithSupOneYear: "dossier accepté, durée APT supérieure à 12 mois",
  closedAndMessageReceived: "dossier accepté, message envoyé après acceptation",
  refusedAndMessageReceived: "dossier refusé, message envoyé après refus",
  withoutContinuationAndMessageReceived:
    "dossier classé sans suite, message après classement sans suite",
  receivedAndDelayTooLong: "durée d'instruction de dossier dépassée",
  initiatedAndDelayTooLong: "durée de construction de dossier dépassée"
};
