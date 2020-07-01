import { Observable, from } from "rxjs";
import { ValidityCheck } from "../model";
import { ValidityCheckModel } from "../database/ValidityCheckModel";

class ValidityCheckRepository {
  public update(id: string, record: ValidityCheck): Observable<ValidityCheck> {
    return from(ValidityCheckModel.query().patchAndFetchById(id, record));
  }
  public add(validityCheck: ValidityCheck): Observable<ValidityCheck> {
    return from(ValidityCheckModel.query().insert(validityCheck));
  }

  public findByDSKey(dsKey: string): Observable<ValidityCheck[]> {
    return from(
      ValidityCheckModel.query().where({
        ds_key: dsKey
      })
    );
  }

  public deleteByDSKey(dsKey: string): Observable<Number> {
    return from(
      ValidityCheckModel.query()
        .where({
          ds_key: dsKey
        })
        .delete()
    );
  }

  public deleteAll(): Observable<Number> {
    return from(ValidityCheckModel.query().delete());
  }

  public deleteByFinAPTBefore(timestamp: Date) {
    return from(
      ValidityCheckModel.query()
        .where("fin_apt", "<", timestamp)
        .delete()
    );
  }

  public findOneByDossierIdAndDateNaissance(
    dossierId: number,
    dateNaissance: string
  ): Observable<ValidityCheck[]> {
    return from(
      ValidityCheckModel.query().where({
        dossier_id: dossierId,
        date_de_naissance: dateNaissance
      })
    );
  }
}

export const validityCheckRepository = new ValidityCheckRepository();
