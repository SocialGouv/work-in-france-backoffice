import { Model } from "objection";
import { SynchroHistory } from "../model";

class SynchroHistoryModel extends Model implements SynchroHistory {
  public id!: string;
  public scheduler: string = "";
  public last_synchro: Date = new Date(0);

  static get tableName() {
    return "synchro_history";
  }

  static get idColumn() {
    return "id";
  }
}

export { SynchroHistoryModel };
