import { addMonths, getMonth, getYear, isBefore } from "date-fns";
import { Observable, Observer, Subject } from "rxjs";
import { concatMap, exhaustMap } from "rxjs/operators";
import { Alert } from "./model";
import { MonthlyReport } from "./model/monthly-report.model";
import { addAlerts } from "./scheduler/alert.scheduler";
import { monthlyreportService } from "./service";
import { logger } from "./util";
import { YearMonth } from "./util/interface/year-month";

class ExtractorService {
  private syncAllMonthlyReports$ = new Subject();
  private syncAllAlerts$ = new Subject();

  constructor() {
    this.initAllMonthlyReportSynchro();
    this.initAllAlertSynchro();
  }

  public launchGlobalMonthlyReportSynchro() {
    this.syncAllMonthlyReports$.next();
  }

  public launchGlobalAlertSynchro() {
    this.syncAllAlerts$.next();
  }

  private allMonthlyReports(): Observable<MonthlyReport> {
    return allDates$.pipe(
      concatMap((res: YearMonth) =>
        monthlyreportService.syncMonthlyReports(res.year, res.month)
      )
    );
  }

  private initAllAlertSynchro() {
    this.syncAllAlerts$
      .pipe(concatMap(() => addAlerts(new Date(0))))
      .subscribe({
        error: (error: Error) => logger.error(`[alerts synchro] error`, error),
        next: (alert: Alert) =>
          logger.info(
            `[alerts synchro] alert added ${alert.ds_key} ${alert.message}`
          )
      });
  }

  private initAllMonthlyReportSynchro() {
    this.syncAllMonthlyReports$
      .pipe(exhaustMap(() => this.allMonthlyReports()))
      .subscribe({
        complete: () => logger.info(`[monthly reports synchro] completed`),
        error: (err: any) =>
          logger.error(`[monthly reports synchro] error: `, err),
        next: (next: MonthlyReport) =>
          logger.info(
            `[monthly reports synchro] report ${next.year}-${next.month} ${next.group.label} synchronised `
          )
      });
  }
}

const allDates$ = Observable.create((observer: Observer<YearMonth>) => {
  let start = new Date(2018, 1, 1);
  const onMonthBefore = addMonths(new Date(), -1);
  while (isBefore(start, onMonthBefore)) {
    observer.next({ year: getYear(start), month: getMonth(start) });
    start = addMonths(start, 1);
  }
  observer.complete();
});

export const extractorService = new ExtractorService();
