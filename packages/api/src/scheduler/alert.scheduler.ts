import { SentMessageInfo } from "nodemailer";
import { NEVER, Observable, of } from "rxjs";
import { concatMap, flatMap, map, mergeMap } from "rxjs/operators";
import { configuration } from "../config";
import { Alert, DossierRecord } from "../model";
import { alertService, dossierRecordService, sendEmail } from "../service";
import { logger } from "../util";
import { handleScheduler } from "./scheduler.service";

export const alertScheduler = {
  start: () => {
    handleScheduler(
      configuration.alertCron,
      "alert",
      (start: number, end: number) => {
        return addAlerts(start, end);
      }
    );

    handleScheduler(configuration.alertEmailCron, "alert-email", () => {
      return alertService.getAlertsToSend().pipe(
        flatMap((x: Alert[]) => x),
        concatMap((alert: Alert) => sendAlertByEmail(alert))
      );
    });
  }
};

function addAlerts(start: number, end: number): Observable<Alert> {
  return dossierRecordService.allByUpdatedAtBetween(start, end).pipe(
    flatMap((x: DossierRecord[]) => x),
    map((x: DossierRecord) => alertService.getAlerts(x)),
    flatMap((x: Alert[]) => x),
    mergeMap((alert: Alert) => alertService.addIfNotExists(alert), undefined, 2)
  );
}

function sendAlertByEmail(alert: Alert) {
  return of(alert).pipe(
    mergeMap(
      (input: Alert) => {
        const email = input.email;
        if (!email) {
          logger.error("", new Error(`alert #${alert.id} has no mail.`));
          return NEVER;
        }
        return sendEmail(email);
      },
      (input, emailResponse) => ({ alert: input, emailResponse })
    ),
    mergeMap((x: { alert: Alert; emailResponse: SentMessageInfo }) =>
      alertService.markAsSent(x.alert, x.emailResponse.messageId)
    )
  );
}
