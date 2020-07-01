import { Observable } from "rxjs";
import { configuration } from "../config";
import { kintoClient, KintoCollection } from "../lib";
import { DossierRecord } from "../model";

class DossierRecordRepository {
  private collection: KintoCollection<DossierRecord>;

  constructor() {
    const kintoAPI = configuration.dsAPI || "";
    const kintoLogin = configuration.dsApiLogin || "";
    const kintoPassword = configuration.dsApiPassword || "";

    this.collection = kintoClient(
      kintoAPI,
      kintoLogin,
      kintoPassword
    ).collection<DossierRecord>("dossiers");
  }

  public allByGroupIdAndProcessedAtBetween(
    groupId: string,
    start: number,
    end: number
  ): Observable<DossierRecord[]> {
    return this.collection.search(
      `metadata.group.id="${groupId}"&gt_metadata.processed_at=${start}&lt_metadata.processed_at=${end}`
    );
  }

  public allByStateAndLastModifiedGreaterThan(
    state: string,
    start: number
  ): Observable<DossierRecord[]> {
    return this.collection.search(
      `metadata.state="${state}"&gt_last_modified=${start}`
    );
  }

  public allByLastModifiedGreaterThan(
    start: number
  ): Observable<DossierRecord[]> {
    return this.collection.search(
      `has_deleted=false&gt_last_modified=${start}`
    );
  }
}

export const dossierRecordRepository = new DossierRecordRepository();
