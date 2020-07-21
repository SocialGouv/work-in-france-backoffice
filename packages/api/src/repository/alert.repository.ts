import { from, Observable } from "rxjs";
import { AlertModel } from "../database/AlertModel";
import { Alert, AlertEmailState } from "../model";

class AlertRepository {
  public all(): Observable<Alert[]> {
    return from(AlertModel.query());
  }

  public add(alert: Alert): Observable<Alert> {
    return from(AlertModel.query().insert(alert));
  }

  public deleteAll(): Observable<number> {
    return from(AlertModel.query().delete());
  }

  public update(alert: Alert): Observable<Alert> {
    if (!alert.id) {
      throw new Error("try updating record without id.");
    }
    return from(AlertModel.query().patchAndFetchById(alert.id, alert));
  }

  public findByDSKeyAndCode(
    dsKey: string,
    alertType: string
  ): Observable<Alert[]> {
    return from(
      AlertModel.query().where({
        ds_key: dsKey,
        alert_type: alertType
      })
    );
  }

  public findByEmailState(state: AlertEmailState): Observable<Alert[]> {
    return from(
      AlertModel.query().where({
        email_state: state
      })
    );
  }
}

export const alertRepository = new AlertRepository();
