import { Model } from "objection";
import { DSGroup } from "../model/dossier-record.model";
import {
  MonthlyReport,
  MonthlyReportCounter
} from "../model/monthly-report.model";

class MonthlyReportModel extends Model implements MonthlyReport {
  public id!: string;
  public year: number = 0;
  public month: number = 0;
  public group: DSGroup = {
    id: "",
    label: ""
  };
  public accepted: {
    more3Months: MonthlyReportCounter;
    less3Months: MonthlyReportCounter;
  } = {
    less3Months: {
      count: 0,
      countries: {},
      dossiers: []
    },
    more3Months: {
      count: 0,
      countries: {},
      dossiers: []
    }
  };
  public refused: MonthlyReportCounter = {
    count: 0,
    countries: {},
    dossiers: []
  };
  public withoutContinuation: MonthlyReportCounter = {
    count: 0,
    countries: {},
    dossiers: []
  };

  static get tableName() {
    return "monthly_report";
  }

  static get idColumn() {
    return "id";
  }
}

export { MonthlyReportModel };
