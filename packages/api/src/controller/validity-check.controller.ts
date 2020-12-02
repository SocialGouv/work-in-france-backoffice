import * as Koa from "koa";
import { validityCheckService } from "../service";

/**
 * Check the validity of an APT (autorisation provisoire de travail) identified
 * by the given demarches-simplifiees.fr's ID and applicant's birthday date.
 */
export const validityCheckController = {
  get: async (ctx: Koa.Context) => {
    const dossierId = Number.parseInt(ctx.params.ds_id, 10);
    const dob = ctx.params.date;
    const data = await validityCheckService
      .findOneByDossierIdAndDateNaissance(dossierId, dob)
      .toPromise();
    if (!data) {
      ctx.body = {
        data: [],
        status: "invalid",
      };
    } else {
      ctx.body = {
        data: [
          {
            champs: data.champs,
            type: data.type,
            date_de_debut_apt: data.date_de_debut_apt,
            date_de_fin_apt: data.date_de_fin_apt,
            date_de_naissance: data.date_de_naissance,
            ds_id: data.dossier_id,
            has_expired: data.has_expired,
            nom: data.nom,
            prenom: data.prenom,
            siret: data.siret,
          },
        ],
        status: "valid",
      };
    }
  },
};
