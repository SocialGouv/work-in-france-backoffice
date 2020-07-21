import { Model } from "objection";
import { Alert, AlertEmailState, AlertType } from "../model/alert.model";
import { DSGroup } from "../model/dossier-record.model";
import { Email } from "../service";

class AlertModel extends Model implements Alert {
  public id!: string;
  public ds_key: string = "";
  public url: string = "";
  public group: DSGroup = {
    id: "",
    label: ""
  };
  public alert_type: AlertType = "closedWithoutDateDebutOrDateFin";
  public message: string = "";
  public instructors_history: string[] = [];
  public email_id?: string;
  public email_usager: string = "";
  public email_instructors: string[] = [];
  public date_debut_apt: string = "";
  public processed_at: Date | null = null;
  public email?: Email;
  public email_state?: AlertEmailState;
  public email_processed_at?: Date;
  public state: string = "";

  static get tableName() {
    return "alert";
  }

  static get idColumn() {
    return "id";
  }
}

export { AlertModel };
