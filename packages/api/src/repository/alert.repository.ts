import { Observable } from "rxjs";
import { Alert } from "../model";
import { KintoRepository } from "./kinto.repository";

class AlertRepository extends KintoRepository<Alert> {
  constructor() {
    super("alerts");
  }

  public all(): Observable<Alert[]> {
    return this.collection.all();
  }

  public add(alert: Alert): Observable<Alert> {
    return this.collection.add(alert);
  }

  public update(alert: Alert): Observable<Alert> {
    if (!alert.id) {
      throw new Error("try updating record without id.");
    }
    return this.collection.update(alert.id, alert);
  }

  public findByDSKeyAndCode(
    dsKey: string,
    alertType: string
  ): Observable<Alert[]> {
    return this.collection.search(
      `ds_key="${dsKey}"&alert_type="${alertType}"`
    );
  }

  public findBySentIsFalse(): Observable<Alert[]> {
    return this.collection.search(`sent=false`);
  }
}

export const alertRepository = new AlertRepository();
