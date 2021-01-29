import { createReadStream, createWriteStream } from "fs";
import * as Koa from "koa";
import { fileSync } from "tmp";
import { extractorService } from "../extract.service";
import { alertService } from "../service/alert/alert.service";
import { logger, mimeTypes } from "../util";

export const alertController = {
  delete: async (ctx: Koa.Context) => {
    const res: number = await alertService.deleteAll().toPromise();
    logger.info(`${res} alerts deleted!`);
    ctx.body = { message: `${res} alerts deleted!` };
    ctx.status = 200;
  },
  download: async (ctx: Koa.Context) => {
    const tempFileName = fileSync();
    const writeStream = createWriteStream(tempFileName.name);
    await alertService.writeAlerts(writeStream);

    const readStream = createReadStream(tempFileName.name);
    ctx.res.setHeader(
      "Content-disposition",
      "attachment; filename=" + `WIF_dossiers-en-souffrance.xlsx`
    );
    ctx.res.setHeader("Content-type", mimeTypes.excel);
    ctx.body = readStream;

    tempFileName.removeCallback();
  },
  syncAll: (ctx: Koa.Context) => {
    extractorService.launchGlobalAlertSynchro();
    ctx.status = 200;
    ctx.body = { message: "[Alerts] Global synchonisation launched" };
  },
};
