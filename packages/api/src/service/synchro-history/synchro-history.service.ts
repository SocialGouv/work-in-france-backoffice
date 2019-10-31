import { Observable, of } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { SynchroHistory } from "../../model";
import { synchroHistoryRepository } from "../../repository";
import { logger } from "../../util";

class SynchroHistoryService {
  public getSynchroHistory(scheduler: string): Observable<SynchroHistory> {
    return synchroHistoryRepository.all().pipe(
      mergeMap((res: any) => {
        const syncHistory = res.find((elm: any) => elm.scheduler === scheduler);
        if (syncHistory) {
          return of(syncHistory);
        } else {
          return synchroHistoryRepository.add({
            last_synchro: 0,
            scheduler
          });
        }
      })
    );
  }

  public update(
    scheduler: string,
    lastSynchro: number
  ): Observable<SynchroHistory> {
    return this.getSynchroHistory(scheduler).pipe(
      tap(
        (synchroHistory: SynchroHistory) =>
          (synchroHistory.last_synchro = lastSynchro)
      ),
      mergeMap((synchroHistory: SynchroHistory) =>
        synchroHistoryRepository.update(synchroHistory.id || "", synchroHistory)
      ),
      tap((synchroHistory: SynchroHistory) => {
        logger.info(
          `[SynchroHistory] update ${synchroHistory.scheduler} with last date ${synchroHistory.last_synchro}`
        );
      })
    );
  }
}

export const synchroHistoryService = new SynchroHistoryService();
