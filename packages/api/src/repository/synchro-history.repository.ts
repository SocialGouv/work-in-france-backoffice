import { Observable, from } from "rxjs";
import { SynchroHistory } from "../model";
import { SynchroHistoryModel } from "../database/SynchroHistoryModel";

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
