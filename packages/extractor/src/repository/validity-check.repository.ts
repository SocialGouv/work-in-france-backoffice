import { Observable } from "rxjs";
import { DeletedData } from "../lib";
import { ValidityCheck } from "../model";
import { KintoRepository } from "./kinto.repository";

class ValidityCheckRepository extends KintoRepository<ValidityCheck> {

    constructor() {
        super('validity_checks');
    }

    public update(id: string, record: ValidityCheck): Observable<ValidityCheck> {
        return this.collection.update(id, record);
    }
    public add(validityCheck: ValidityCheck): Observable<ValidityCheck> {
        return this.collection.add(validityCheck);
    }

    public deleteByDSKey(dsKey: string): Observable<DeletedData[]> {
        return this.collection.delete(`ds_key="${dsKey}"`);
    }

}

export const validityCheckRepository = new ValidityCheckRepository();