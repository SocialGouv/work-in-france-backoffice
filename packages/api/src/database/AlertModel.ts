import { Model } from "objection";
import { Alert, AlertType, AlertEmailState } from "../model/alert.model";
import { DSGroup } from "../model/dossier-record.model";
import { Email } from "../service";

class AlertModel extends Model implements Alert {
  id!: string;
  ds_key: string = "";
  url: string = "";
  group: DSGroup = {
    id: "",
    label: ""
  };
  alert_type: AlertType = "closedWithoutDateDebutOrDateFin";
  message: string = "";
  instructors_history: string[] = [];
  email_id?: string;
  email_usager: string = "";
  email_instructors: string[] = [];
  date_debut_apt: string = "";
  processed_at: Date | null = null;
  email?: Email;
  email_state?: AlertEmailState;
  email_processed_at?: Date;
  state: string = "";

  static get tableName() {
    return "alert";
  }

  static get idColumn() {
    return "id";
  }
}

export { AlertModel };
