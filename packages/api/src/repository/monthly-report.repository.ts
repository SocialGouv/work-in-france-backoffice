import { from, Observable } from "rxjs";
import { MonthlyReportModel } from "../database/MonthlyReportModel";
import { MonthlyReport } from "../model/monthly-report.model";

class MonthlyReportRepository {
  public delete(
    year: number,
    month: number,
    groupId: string
  ): Observable<number> {
    return from(
      MonthlyReportModel.query()
        .where({
          month,
          year
        })
        .andWhereRaw(`"group" @> '{"id":"${groupId}"}'::jsonb`)
        .delete()
    );
  }

  public add(report: MonthlyReport): Observable<MonthlyReport> {
    return from(MonthlyReportModel.query().insert(report));
  }

  public all(): Observable<MonthlyReport[]> {
    return from(MonthlyReportModel.query());
  }

  public find(
    year: number,
    month: number,
    groupId?: string
  ): Observable<MonthlyReport[]> {
    let queryBuilder = MonthlyReportModel.query().where({
      month,
      year
    });
    if (groupId) {
      queryBuilder = queryBuilder.andWhereRaw(
        `"group" @> '{"id":"${groupId}"}'::jsonb`
      );
    }

    return from(queryBuilder);
  }
}

export const monthlyReportRepository = new MonthlyReportRepository();
