import { Email } from "../service";
import { IIdentifiable } from "../util";
import { DSGroup } from "./dossier-record.model";

export type AlertType =
  | "closedWithoutDateDebutOrDateFin"
  | "closedWithDebutSupFin"
  | "closedWithSupOneYear"
  | "closedAndMessageReceived"
  | "refusedAndMessageReceived"
  | "withoutContinuationAndMessageReceived"
  | "receivedAndDelayTooLong"
  | "initiatedAndDelayTooLong";

  export type AlertEmailState = "to_send" | "sent" | "blocked";

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
  processed_at: number | null;
  email?: Email;
  email_state?: AlertEmailState;
  email_processed_at?: number;
  state: string; // dossier state
}

export interface AlertMessage {
  message: string;
}

export const alertMaxReceivedTimeInDays = 7;
export const alertMaxInitiatedTimeInDays = 7;

export const alertMessages = {
  closedWithoutDateDebutOrDateFin:
    "dossier accepté, date de début et/ou de fin APT manquante",

  closedWithDebutSupFin:
    "dossier accepté, date de fin APT antérieure à Date de début APT",
  closedWithSupOneYear: "dossier accepté, durée APT supérieure à 12 mois",

  closedAndMessageReceived:
    "dossier archivé et message envoyé après acceptation",
  refusedAndMessageReceived: "dossier archivé et message envoyé après refus",
  withoutContinuationAndMessageReceived:
    "dossier archivé et message après classement sans suite",

  receivedAndDelayTooLong: "durée d'instruction de dossier dépassée",

  initiatedAndDelayTooLong: "durée de construction de dossier dépassée"
};
