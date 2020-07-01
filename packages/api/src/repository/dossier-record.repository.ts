import { Observable, from } from "rxjs";
import { aggregatorDatabase } from "../database/config";
import { DossierRecord } from "../model";

class DossierRecordRepository {
  public allByGroupIdAndProcessedAtBetween(
    groupId: string,
    start: number,
    end: number
  ): Observable<DossierRecord[]> {
    return from(
      aggregatorDatabase<DossierRecord>("dossier_record")
        .where("processed_at", ">=", new Date(start))
        .andWhere("processed_at", "<", new Date(end)).andWhereRaw(`
          metadata->'group'  @> '{ "id": "${groupId}" }'::jsonb
      `)
    );
  }

  public allByStateAndLastModifiedGreaterThan(
    state: string,
    start: number
  ): Observable<DossierRecord[]> {
    return from(
      aggregatorDatabase<DossierRecord>("dossier_record")
        .where("state", "=", state)
        .andWhere("last_modified", ">=", new Date(start))
    );
  }

  public allByLastModifiedGreaterThan(
    start: number
  ): Observable<DossierRecord[]> {
    return from(
      aggregatorDatabase<DossierRecord>("dossier_record").where(
        "last_modified",
        ">=",
        new Date(start)
      )
    );
  }
}

export const dossierRecordRepository = new DossierRecordRepository();
