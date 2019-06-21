import { filter, flatMap, mergeMap, tap } from "rxjs/operators";
import { configuration } from "../config";
import { DeletedData } from "../lib";
import { DossierRecord, ValidityCheck } from "../model";
import { dossierRecordService, validityCheckService } from "../service";
import { logger } from "../util";
import { handleScheduler } from "./scheduler.service";

export const validityCheckScheduler = {
  start: () => {
    handleScheduler(
      configuration.validityCheckCron,
      "validity-check",
      (start: number, end: number) => {
        return dossierRecordService
          .allByStateAndProcessedAtBetween("closed", start, end)
          .pipe(
            tap((res: DossierRecord[]) =>
              logger.info(`[syncValidityChecks] ${res.length} dossiers fetched`)
            ),
            flatMap((x: DossierRecord[]) => x),
            filter(validityCheckService.isValid),
            mergeMap(validityCheckService.addIfNotExists, undefined, 2),
            tap((res: ValidityCheck) =>
              logger.info(
                `[syncValidityChecks] validity check created ${res.ds_key} `
              )
            )
          );
      }
    );

    handleScheduler(
      configuration.validityCheckCleanerCron,
      "validity-check-cleaner",
      () => {
        const now = new Date();
        return validityCheckService
          .deleteByFinAPTBefore(now.getTime())
          .pipe(
            tap((res: DeletedData[]) =>
              logger.info(
                `[cleanValidityChecks] ${res.length} validity checks deleted`
              )
            )
          );
      }
    );
  }
};
