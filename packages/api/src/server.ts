import * as cors from "@koa/cors";
import * as Koa from "koa";
import { create } from "domain";
import { HttpError } from "http-errors";
import * as Sentry from "@sentry/node";
import * as bodyParser from "koa-bodyparser";
import { configuration } from "./config";
import dbConnect from "./database/config";
import { router } from "./routes";
import { monthlyReportScheduler, validityCheckScheduler } from "./scheduler";
import { alertScheduler } from "./scheduler/alert.scheduler";
import { logger } from "./util";
import {
  extractTraceparentData,
  stripUrlQueryAndFragment
} from "@sentry/tracing";

dbConnect();

validityCheckScheduler.start();
monthlyReportScheduler.start();
alertScheduler.start();

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

const requestHandler = (ctx: Koa.Context, next: Koa.Next) => {
  return new Promise((resolve, _) => {
    const local = create();
    local.add(ctx.app);
    local.on("error", (err: HttpError) => {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    });
    local.run(async () => {
      Sentry.getCurrentHub().configureScope(scope =>
        scope.addEventProcessor(event =>
          Sentry.Handlers.parseRequest(event, ctx.request, { user: false })
        )
      );
      await next();
      resolve();
    });
  });
};

// this tracing middleware creates a transaction per request
const tracingMiddleWare = async (ctx: Koa.Context, next: Koa.Next) => {
  const reqMethod = (ctx.method || "").toUpperCase();
  const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);

  // connect to trace of upstream app
  let traceparentData;
  if (ctx.request.get("sentry-trace")) {
    traceparentData = extractTraceparentData(ctx.request.get("sentry-trace"));
  }

  const transaction = Sentry.startTransaction({
    name: `${reqMethod} ${reqUrl}`,
    op: "http.server",
    ...traceparentData
  });

  ctx.__sentry_transaction = transaction;
  await next();

  // if using koa router, a nicer way to capture transaction using the matched route
  if (ctx._matchedRoute) {
    const mountPath = ctx.mountPath || "";
    transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
  }
  transaction.setHttpStatus(ctx.status);
  transaction.finish();
};

app.use(requestHandler);
app.use(tracingMiddleWare);

app.on("error", (err, ctx: Koa.Context) => {
  Sentry.withScope(scope => {
    scope.addEventProcessor(event => {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    // will call `Sentry.captureException(err);`
    logger.error(`[error] ${ctx.originalUrl} `, err);
  });
});

app.listen(configuration.apiPort);

logger.info(`server is started!`);
