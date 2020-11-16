import * as Router from "koa-router";
import { configuration } from "./config";
import {
  alertController,
  monthlyReportController,
  validityCheckController,
} from "./controller";

const routeOptions: Router.IRouterOptions = {
  prefix: "/api",
};

const router = new Router(routeOptions);

router.get("/liveness", (ctx, next) => {
  ctx.body = "Live OK";
  next();
});

router.get("/readiness", (ctx, next) => {
  ctx.body = "Readi OK";
  next();
});

const validityCheckURL = "/v1/apt_validity_check";
router.get(`${validityCheckURL}/:ds_id/:date`, validityCheckController.get);

const monthlyreportURL = `/${configuration.apiPrefix}/monthly-reports`;
// monthly-reports - launch global synchronisation
router.post(`${monthlyreportURL}/sync-all`, monthlyReportController.syncAll);
router.get(
  `${monthlyreportURL}/:year/:month/:group/download`,
  monthlyReportController.download
);

const alertBaseURL = `/${configuration.apiPrefix}/alerts`;
router.delete(`${alertBaseURL}`, alertController.delete);
router.post(`${alertBaseURL}/sync-all`, alertController.syncAll);
router.get(`${alertBaseURL}/download`, alertController.download);

export { router };
