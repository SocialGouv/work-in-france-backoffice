import { Model } from "objection";
import {
  MonthlyReport,
  MonthlyReportCounter
} from "../model/monthly-report.model";
import { DSGroup } from "../model/dossier-record.model";

class MonthlyReportModel extends Model implements MonthlyReport {
  id!: string;
  year: number = 0;
  month: number = 0;
  group: DSGroup = {
    id: "",
    label: ""
  };
  accepted: {
    more3Months: MonthlyReportCounter;
    less3Months: MonthlyReportCounter;
  } = {
    more3Months: {
      count: 0,
      countries: {},
      dossiers: []
    },
    less3Months: {
      count: 0,
      countries: {},
      dossiers: []
    }
  };
  refused: MonthlyReportCounter = {
    count: 0,
    countries: {},
    dossiers: []
  };
  withoutContinuation: MonthlyReportCounter = {
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
