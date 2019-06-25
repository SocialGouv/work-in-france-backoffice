import { SentMessageInfo } from "nodemailer";
import { NEVER, Observable, of } from "rxjs";
import { concatMap, flatMap, map, mergeMap, tap } from "rxjs/operators";
import { configuration } from "../config";
import { Alert, DossierRecord } from "../model";
import { alertService, dossierRecordService, sendEmail } from "../service";
import { logger } from "../util";
import { handleScheduler } from "./scheduler.service";

export const addAlerts = (start: number, end: number): Observable<Alert> => {
  return dossierRecordService.allByUpdatedAtBetween(start, end).pipe(
    flatMap((x: DossierRecord[]) => x),
    map((x: DossierRecord) => alertService.getAlerts(x)),
    flatMap((x: Alert[]) => x),
    mergeMap(
      (alert: Alert) => alertService.addIfNotExists(alert),
      undefined,
      2
    ),
    tap((alert: Alert) =>
      logger.info(
        `[alertScheduler] alert [${alert.ds_key} - ${alert.message}] added`
      )
    )
  );
};

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
        concatMap((alert: Alert) => sendAlertEmail(alert))
      );
    });
  }
};

function sendAlertEmail(alert: Alert): Observable<Alert> {
  return of(alert).pipe(
    mergeMap((input: Alert) => {
      if (alertService.shouldBeBlocked(alert)) {
        logger.info(`[sendAlertEmail] alert ${alert.id} blocked`);
        return alertService.markAsBlocked(input);
      }
      return of(input);
    }),
    mergeMap(
      (input: Alert) => {
        const email = input.email;
        if (email && input.email_state === "to_send") {
          return sendEmail(email);
        }
        return NEVER;
      },
      (input, emailResponse) => ({ alert: input, emailResponse })
    ),
    mergeMap((x: { alert: Alert; emailResponse: SentMessageInfo }) =>
      alertService.markAsSent(x.alert, x.emailResponse.messageId)
    )
  );
}
