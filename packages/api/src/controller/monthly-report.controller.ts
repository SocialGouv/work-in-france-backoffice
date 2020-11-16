import { createReadStream, createWriteStream } from "fs";
import * as Koa from "koa";
import { fileSync } from "tmp";
import { extractorService } from "../extract.service";
import { monthlyreportService } from "../service";
import { getMonthlyReportFilename } from "../service/monthly-report/monthly-report.util";
import { mimeTypes } from "../util";

export const monthlyReportController = {
  download: async (ctx: Koa.Context) => {
    const groupId = ctx.params.group;
    const year = ctx.params.year;
    const month = ctx.params.month - 1;

    const tempFileName = fileSync();
    const writeStream = createWriteStream(tempFileName.name);
    await monthlyreportService.writeMonthlyReportExcel(
      year,
      month,
      groupId,
      writeStream
    );

    const readStream = createReadStream(tempFileName.name);
    ctx.res.setHeader(
      "Content-disposition",
      "attachment; filename=" + getMonthlyReportFilename(year, month, groupId)
    );
    ctx.res.setHeader("Content-type", mimeTypes.excel);
    ctx.body = readStream;

    tempFileName.removeCallback();
  },
  syncAll: (ctx: Koa.Context) => {
    extractorService.launchGlobalMonthlyReportSynchro();
    ctx.status = 200;
    ctx.body = { message: `[Monthly Reports] Global synchonisation launched` };
  },
};
