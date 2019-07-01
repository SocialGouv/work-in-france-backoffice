import { addMonths } from "date-fns";
import { Observable } from "rxjs";
import { DossierRecord } from "../../model";
import { dossierRecordRepository } from "../../repository";

class DossierRecordService {
  public all(): Observable<DossierRecord[]> {
    return dossierRecordRepository.all();
  }

  public allByMonthAndGroupId(year: number, month: number, groupId: string) {
    const start = new Date(year, month, 1).getTime();
    const end = addMonths(start, 1).getTime();
    return dossierRecordRepository.allByGroupIdAndProcessedAtBetween(
      groupId,
      start,
      end
    );
  }

  public allByStateAndLastModifiedGreaterThan(state: string, start: number) {
    return dossierRecordRepository.allByStateAndLastModifiedGreaterThan(
      state,
      start
    );
  }

  public allByLastModifiedGreaterThan(
    start: number
  ): Observable<DossierRecord[]> {
    return dossierRecordRepository.allByLastModifiedGreaterThan(start);
  }
}

export const dossierRecordService = new DossierRecordService();
