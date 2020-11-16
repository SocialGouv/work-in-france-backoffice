import { format } from "logform";
import * as Sentry from "@sentry/node";
import { version } from "../../../package.json";
import { createLogger, transports } from "winston";
import { configuration } from "../../config";

if (configuration.sentryEnabled) {
  Sentry.init({
    dsn: configuration.sentryDSN,
    environment: "production",
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
    release: version,
  });
}

const appendErrorInfo = (info: any, error: Error) => {
  return {
    ...info,
    message: error.message,
    stack: error.stack,
  };
};

const errorStackFormat = format((info: any) => {
  if (info instanceof Error) {
    return appendErrorInfo(info, info);
  }
  const { ...args } = info;
  if (args) {
    for (let i = 0; i++; i < args.length) {
      if (args[i] instanceof Error) {
        return appendErrorInfo(info, args[i]);
      }
    }
  }
  return info;
});

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errorStackFormat(),
  format.printf((info: any) => {
    const { timestamp, level, message, stack, ...args } = info;

    if (stack) {
      return `${timestamp} ${level}: ${message}\n${stack}`;
    } else {
      return `${timestamp} ${level}: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
      }`;
    }
  })
);

const wLogger = createLogger({
  level: "info",
  transports: [
    new transports.Console({
      format: alignedWithColorsAndTime,
      handleExceptions: true,
    }),
  ],
});

const logger = {
  debug: (message: string) => wLogger.debug(message),
  error: (message: string, err: Error) => {
    wLogger.error(message, err);
    if (configuration.sentryEnabled) {
      Sentry.captureException(err);
    }
  },
  info: (message: string) => wLogger.info(message),
};

export default logger;
