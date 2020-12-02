import { IIdentifiable } from "../util/persistence";
import { DSChamp, DSType } from "./dossier-record.model";

export interface ValidityCheck extends IIdentifiable {
  type: DSType;
  dossier_id: number;
  ds_key: string;
  siret: string;
  prenom: string;
  nom: string;
  date_de_naissance: string;
  has_expired: boolean;
  date_de_debut_apt: string;
  date_de_fin_apt: string;
  fin_apt: Date;
  champs: DSChamp[];
}

// "ds_id": 378335,
// "siret": "000000000000000",
// "prenom": "*y***",
// "nom": "*a******",
// "date_de_naissance": "1990-01-01",
// "has_expired": false,
// "date_de_debut_apt": "2019-03-18",
// "date_de_fin_apt": "2019-11-04"
