import { Model } from "objection";
import { DSChamp, DSType, ValidityCheck } from "../model";

class ValidityCheckModel extends Model implements ValidityCheck {
  /* tslint:disable: variable-name */
  public type: DSType = "autorisation";
  public id!: string;
  public dossier_id: number = 0;
  public ds_key: string = "";
  public siret: string = "";
  public prenom: string = "";
  public nom: string = "";
  public date_de_naissance: string = "";
  public has_expired: boolean = false;
  public date_de_debut_apt: string = "";
  public date_de_fin_apt: string = "";
  public fin_apt: Date = new Date(0);
  public champs: DSChamp[] = [];

  static get tableName() {
    return "validity_check";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonAttributes() {
    return ["champs"];
  }
}

export { ValidityCheckModel };
