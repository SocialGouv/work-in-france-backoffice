import { DSType } from "./dossier-record.model";

export interface ProcedureConfig {
  procedures: number[];
  group: {
    id: string;
    label: string;
    type: DSType;
  };
}
