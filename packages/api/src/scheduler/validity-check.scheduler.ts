import { addMinutes } from "date-fns";
import { filter, flatMap, mergeMap, tap } from "rxjs/operators";
import { configuration } from "../config";
import { DossierRecord, ValidityCheck } from "../model";
import { dossierRecordService, validityCheckService } from "../service";
import { logger } from "../util";
import { handleScheduler } from "./scheduler.service";

export const validityCheckScheduler = {
  start: () => {
    handleScheduler(
      configuration.validityCheckCron,
      "validity-check",
      (start: Date) => {
        const startLess10Minutes = addMinutes(start, -10).getTime();
        return dossierRecordService
          .allByStateAndLastModifiedGreaterThan(
            "closed",
            startLess10Minutes < 0 ? 0 : startLess10Minutes
          )
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
          .deleteByFinAPTBefore(now)
          .pipe(
            tap((res: Number) =>
              logger.info(
                `[cleanValidityChecks] ${res} validity checks deleted`
              )
            )
          );
      }
    );
  }
};
