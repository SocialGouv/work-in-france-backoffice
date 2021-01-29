import { schedule } from "node-cron";
import { Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { SynchroHistory } from "../model";
import { synchroHistoryService } from "../service";
import { logger } from "../util";

const schedulerStates = new Map<string, boolean>();

export const handleScheduler = (
  cron: string,
  scheduler: string,
  process: (start: Date, end: Date) => Observable<any>
) => {
  schedule(cron, () => {
    if (schedulerStates.get(scheduler)) {
      logger.info(`[Scheduler] ${scheduler} is running...`);
      return;
    }
    logger.info(`[Scheduler] ${scheduler} is starting...`);
    schedulerStates.set(scheduler, true);
    const end = new Date();
    synchroHistoryService
      .getSynchroHistory(scheduler)
      .pipe(
        tap((syncHistory: SynchroHistory) =>
          logger.info(
            `[Scheduler] ${scheduler} - ${new Date(
              syncHistory.last_synchro
            )} > ${end}`
          )
        ),
        mergeMap((syncHistory: SynchroHistory) =>
          process(syncHistory.last_synchro, end)
        )
      )
      .subscribe({
        complete: () => {
          synchroHistoryService.update(scheduler, end).subscribe({
            complete: () => completeProcess(scheduler),
          });
        },
        error: (err: any) => handleError(scheduler, err),
      });
  });
  logger.info(`[scheduler] ${scheduler} [${cron}] scheduled!`);
};

const handleError = (scheduler: string, err: any) => {
  logger.error(`[Scheduler] ${scheduler} error `, err);
  schedulerStates.set(scheduler, false);
};

const completeProcess = (scheduler: string) => {
  schedulerStates.set(scheduler, false);
  logger.info(`[Scheduler] ${scheduler} completed`);
};
