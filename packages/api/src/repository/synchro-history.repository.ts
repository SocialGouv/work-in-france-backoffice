import { from, Observable } from "rxjs";
import { SynchroHistoryModel } from "../database/SynchroHistoryModel";
import { SynchroHistory } from "../model";

class SynchroHistoryRepository {
  public all(): Observable<SynchroHistory[]> {
    return from(SynchroHistoryModel.query());
  }

  public add(synchroHistory: SynchroHistory): Observable<SynchroHistory> {
    return from(SynchroHistoryModel.query().insert(synchroHistory));
  }

  public update(
    id: string,
    synchroHistory: SynchroHistory
  ): Observable<SynchroHistory> {
    return from(
      SynchroHistoryModel.query().patchAndFetchById(id, synchroHistory)
    );
  }
}

export const synchroHistoryRepository = new SynchroHistoryRepository();
