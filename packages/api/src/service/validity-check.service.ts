import { EMPTY, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import {
  DossierRecord,
  getDateDebutAPTValue,
  getDateFinAPT,
  getDateFinAPTValue,
  getDateNaissanceValue,
  getNomValue,
  getPrenomValue,
  hasExpired,
  ValidityCheck,
} from "../model";
import { validityCheckRepository } from "../repository";
import { obfuscate } from "../util";

class ValidityCheckService {
  public isValid(record: DossierRecord) {
    return !hasExpired(record);
  }

  public findOneByDossierIdAndDateNaissance(
    dossierId: number,
    dateNaissance: string
  ): Observable<ValidityCheck | null> {
    return validityCheckRepository
      .findOneByDossierIdAndDateNaissance(dossierId, dateNaissance)
      .pipe(
        map((res: ValidityCheck[]) => {
          if (res.length > 0) {
            return res[0];
          }
          return null;
        })
      );
  }

  public addIfNotExists(record: DossierRecord): Observable<ValidityCheck> {
    const dateFinAPT = getDateFinAPT(record);
    const validityCheck = {
      dossier_id: record.ds_data.id,
      ds_key: record.ds_key,
      siret: record.ds_data.etablissement.siret,
      // tslint:disable-next-line: object-literal-sort-keys
      prenom: obfuscate(getPrenomValue(record)),
      nom: obfuscate(getNomValue(record)),
      date_de_naissance: getDateNaissanceValue(record),
      has_expired: hasExpired(record),
      date_de_debut_apt: getDateDebutAPTValue(record),
      date_de_fin_apt: getDateFinAPTValue(record),
      fin_apt: dateFinAPT ? dateFinAPT : new Date(0),
    };
    return validityCheckRepository.findByDSKey(validityCheck.ds_key).pipe(
      mergeMap((res: any) => {
        if (res.length > 0) {
          return EMPTY;
        }
        return validityCheckRepository.add(validityCheck);
      })
    );
  }

  public deleteAll(): Observable<number> {
    return validityCheckRepository.deleteAll();
  }

  public deleteByFinAPTBefore(timestamp: Date): Observable<number> {
    return validityCheckRepository.deleteByFinAPTBefore(timestamp);
  }
}

export const validityCheckService = new ValidityCheckService();
