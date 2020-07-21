import { from, Observable } from "rxjs";
import { aggregatorDatabase } from "../database/config";
import { ProcedureConfig } from "../model";

class ProcedureConfigRepository {
  public all(): Observable<ProcedureConfig[]> {
    return from(aggregatorDatabase<ProcedureConfig>("procedure_config"));
  }
}

export const procedureConfigRepository = new ProcedureConfigRepository();
