import { EMPTY, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import {
  DossierRecord,
  DSChamp,
  getDateDebutAPTValue,
  getDateFinAPT,
  getDateFinAPTValue,
  getDateNaissanceValue,
  getNomValue,
  getPrenomValue,
  getType,
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

  public addAPTIfNotExists(record: DossierRecord): Observable<ValidityCheck> {
    const dateFinAPT = getDateFinAPT(record);
    const validityCheck: ValidityCheck = {
      type: "autorisation",
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
      champs: ValidityCheckService.processChamps(record.ds_data.champs),
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

  static filterChamps(champs: DSChamp[]): DSChamp[] {
    const VALID_FIELDS = [
      "Lieu de naissance",
      "Nationalité",
      "Type de contrat",
      "Emploi occupé",
      "Nombre d'heures",
    ];
    return champs.filter(({ type_de_champ }) =>
      VALID_FIELDS.includes(type_de_champ.libelle)
    );
  }

  static formatChamps(champs: DSChamp[]): DSChamp[] {
    return champs.map(({ value, type_de_champ: { libelle } }) => ({
      value,
      type_de_champ: {
        libelle,
      },
    }));
  }

  static processChamps(champs: DSChamp[]): DSChamp[] {
    return ValidityCheckService.formatChamps(
      ValidityCheckService.filterChamps(champs)
    );
  }

  public addIntroductionIfNotExists(
    record: DossierRecord
  ): Observable<ValidityCheck> {
    const validityCheck: ValidityCheck = {
      type: "introduction",
      dossier_id: record.ds_data.id,
      ds_key: record.ds_key,
      siret: record.ds_data.etablissement.siret,
      // tslint:disable-next-line: object-literal-sort-keys
      prenom: obfuscate(getPrenomValue(record)),
      nom: obfuscate(getNomValue(record)),
      date_de_naissance: getDateNaissanceValue(record),
      has_expired: hasExpired(record),
      date_de_debut_apt: "",
      date_de_fin_apt: "",
      fin_apt: new Date(0),
      champs: ValidityCheckService.processChamps(record.ds_data.champs),
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

  public addIfNotExists = (
    record: DossierRecord
  ): Observable<ValidityCheck> => {
    const recordType = getType(record);

    return recordType === "introduction"
      ? this.addIntroductionIfNotExists(record)
      : this.addAPTIfNotExists(record);
  };

  public deleteAll(): Observable<number> {
    return validityCheckRepository.deleteAll();
  }

  public deleteByFinAPTBefore(timestamp: Date): Observable<number> {
    return validityCheckRepository.deleteByFinAPTBefore(timestamp);
  }
}

export const validityCheckService = new ValidityCheckService();
