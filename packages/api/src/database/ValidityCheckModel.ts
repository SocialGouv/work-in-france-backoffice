import { Model } from "objection";
import { ValidityCheck } from "../model";

class ValidityCheckModel extends Model implements ValidityCheck {
  id!: string;
  dossier_id: number = 0;
  ds_key: string = "";
  siret: string = "";
  prenom: string = "";
  nom: string = "";
  date_de_naissance: string = "";
  has_expired: boolean = false;
  date_de_debut_apt: string = "";
  date_de_fin_apt: string = "";
  fin_apt: Date = new Date(0);

  static get tableName() {
    return "validity_check";
  }

  static get idColumn() {
    return "id";
  }
}

export { ValidityCheckModel };
