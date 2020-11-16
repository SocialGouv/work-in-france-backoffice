import { differenceInDays, differenceInMonths } from "date-fns";
import { Observable } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";
import { Stream } from "stream";
import {
  DossierRecord,
  DSCommentaire,
  getDateDebutAPT,
  getDateDebutAPTValue,
  getDateDebutConstruction,
  getDateDebutInstruction,
  getDateFinAPT,
  getDemarcheSimplifieeUrl,
  isClosed,
  isInitiated,
  isReceived,
  isRefused,
  isWithoutContinuation,
} from "../../model";
import {
  Alert,
  alertEmailShouldBeBlocked,
  alertMaxInitiatedTimeInDays,
  alertMaxReceivedTimeInDays,
  alertMessages,
  AlertType,
} from "../../model/alert.model";
import { alertRepository } from "../../repository/alert.repository";
import { getAlertEmail } from "./alert.email";
import { exportAlertsInExcel } from "./alert.excel";

const dsContactEmail = "contact@demarches-simplifiees.fr";
const maxReceivedTimeInDays = alertMaxReceivedTimeInDays;
const maxInitiatedTimeInDays = alertMaxInitiatedTimeInDays;
const direcctDomainName = "direccte.gouv.fr";

const block = (alert: Alert) => {
  alert.email_state = "blocked";
  alert.email_processed_at = new Date();
};

class AlertService {
  public deleteAll(): Observable<number> {
    return alertRepository.deleteAll();
  }

  public markAsSent(alert: Alert, messageId: string) {
    alert.email_id = messageId;
    alert.email_state = "sent";
    alert.email_processed_at = new Date();
    return alertRepository.update(alert);
  }

  public markAsBlocked(alert: Alert) {
    block(alert);
    return alertRepository.update(alert);
  }

  public async writeAlerts(stream: Stream) {
    const alerts: Alert[] = await alertRepository.all().toPromise();
    if (alerts.length === 0) {
      return;
    }
    await exportAlertsInExcel(alerts, stream);
  }

  public getAlertsToSend(): Observable<Alert[]> {
    return alertRepository.findByEmailState("to_send");
  }

  public addIfNotExists(alert: Alert): Observable<Alert> {
    if (alert.email && this.shouldBeBlocked(alert)) {
      block(alert);
    }
    return alertRepository
      .findByDSKeyAndCode(alert.ds_key, alert.alert_type)
      .pipe(
        filter((x: Alert[]) => x.length === 0),
        mergeMap(() => alertRepository.add(alert))
      );
  }

  public getAlerts(dossier: DossierRecord): Alert[] {
    const alerts: Alert[] = [];
    if (isClosed(dossier)) {
      this.addAlert(
        alerts,
        dossier,
        (d: DossierRecord) =>
          isDateDebutAPTNotPresent(d) || isDateFinAPTNotPresent(d),
        "closedWithoutDateDebutOrDateFin"
      );
      this.addAlert(
        alerts,
        dossier,
        isFinAPTBeforeDebutAPT,
        "closedWithDebutSupFin"
      );
      this.addAlert(alerts, dossier, isAPTSup12Months, "closedWithSupOneYear");
      this.addAlert(
        alerts,
        dossier,
        isMessageSentAfterProcessedAt,
        "closedAndMessageReceived"
      );
    } else if (isRefused(dossier)) {
      this.addAlert(
        alerts,
        dossier,
        isMessageSentAfterProcessedAt,
        "refusedAndMessageReceived"
      );
    } else if (isWithoutContinuation(dossier)) {
      this.addAlert(
        alerts,
        dossier,
        isMessageSentAfterProcessedAt,
        "withoutContinuationAndMessageReceived"
      );
    } else if (isReceived(dossier)) {
      this.addAlert(
        alerts,
        dossier,
        isReceivedTimeTooLong,
        "receivedAndDelayTooLong"
      );
    } else if (isInitiated(dossier)) {
      this.addAlert(
        alerts,
        dossier,
        isInitiatedTimeTooLong,
        "initiatedAndDelayTooLong"
      );
    }

    return alerts;
  }

  public shouldBeBlocked(alert: Alert) {
    if (!alert.email) {
      return false;
    }
    const emailState = alert.email_state || null;
    const processedAt = alert.processed_at || null;
    return alertEmailShouldBeBlocked(emailState, processedAt);
  }

  private addAlert(
    alerts: Alert[],
    dossier: DossierRecord,
    isAlert: (dossier: DossierRecord) => boolean,
    alertType: AlertType
  ) {
    if (isAlert(dossier)) {
      const alert: Alert = {
        ds_key: dossier.ds_key,
        url: getDemarcheSimplifieeUrl(dossier),
        // tslint:disable-next-line: object-literal-sort-keys
        group: dossier.metadata.group,
        message: alertMessages[alertType],
        alert_type: alertType,
        instructors_history: dossier.metadata.instructors_history,
        email_usager: dossier.ds_data.email,
        email_instructors: dossier.ds_data.instructeurs,
        date_debut_apt: getDateDebutAPTValue(dossier),
        processed_at: dossier.metadata.processed_at
          ? new Date(dossier.metadata.processed_at)
          : null,
        state: dossier.metadata.state,
      };
      const email = getAlertEmail(alert);

      if (email) {
        alert.email = getAlertEmail(alert);
        alert.email_state = "to_send";
      }
      alerts.push(alert);
    }
  }
}

export const alertService = new AlertService();

const allComments: (dossier: DossierRecord) => DSCommentaire[] = (
  dossier: DossierRecord
) => {
  return dossier.ds_data.commentaires ? dossier.ds_data.commentaires : [];
};

const allMessages: (dossier: DossierRecord) => DSCommentaire[] = (
  dossier: DossierRecord
) => {
  return allComments(dossier).filter(
    (comment: any) => comment.email !== dsContactEmail
  );
};

const lastMessageSentByStudentDate = (dossier: DossierRecord) => {
  const messages = allMessages(dossier);
  if (messages.length === 0) {
    return null;
  }
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.email.endsWith(direcctDomainName)) {
    return null;
  }
  return new Date(lastMessage.created_at);
};

const isMessageSentAfterProcessedAt = (dossier: DossierRecord) => {
  if (!dossier.ds_data.archived) {
    return false;
  }
  const lastSentDate = lastMessageSentByStudentDate(dossier);
  const processedAtTime = dossier.metadata.processed_at;
  if (!lastSentDate || !processedAtTime) {
    return false;
  }
  return lastSentDate.getTime() > processedAtTime;
};

const isReceivedTimeTooLong = (dossier: DossierRecord) => {
  const receivedDate = getDateDebutInstruction(dossier);
  return delayTooLong(receivedDate, maxReceivedTimeInDays);
};
const isInitiatedTimeTooLong = (dossier: DossierRecord) => {
  const initiatedDate = getDateDebutConstruction(dossier);
  return delayTooLong(initiatedDate, maxInitiatedTimeInDays);
};

const delayTooLong = (date: Date | null, maxDelay: number) => {
  if (!date) {
    return false;
  }
  const now = new Date();
  return differenceInDays(date, now) > maxDelay;
};

const isDateDebutAPTNotPresent = (dossier: DossierRecord) => {
  return getDateDebutAPT(dossier) == null;
};

const isDateFinAPTNotPresent = (dossier: DossierRecord) => {
  return getDateFinAPT(dossier) == null;
};

const isFinAPTBeforeDebutAPT = (dossier: DossierRecord) => {
  const debut = getDateDebutAPT(dossier);
  const fin = getDateFinAPT(dossier);
  if (!fin || !debut) {
    return false;
  }
  return fin.getTime() < debut.getTime();
};

const isAPTSup12Months = (dossier: DossierRecord) => {
  const fin = getDateDebutAPT(dossier);
  const debut = getDateFinAPT(dossier);
  if (!fin || !debut) {
    return false;
  }
  return differenceInMonths(debut, fin) > 12;
};
