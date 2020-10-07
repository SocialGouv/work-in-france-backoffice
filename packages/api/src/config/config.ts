type EnvironmentType = "prod" | "dev.factory" | "dev.local";

const asString = (
  env: typeof process.env,
  arg: string,
  defaultValue: string
): string => {
  const res = env[arg];
  if (!res) {
    return defaultValue;
  }
  return res;
};

const asNumber = (
  env: typeof process.env,
  arg: string,
  defaultValue: number
): number => {
  const res = env[arg];
  if (!res) {
    return defaultValue;
  }
  return Number.parseInt(res, 10);
};

const asBoolean = (
  env: typeof process.env,
  arg: string,
  defaultValue: boolean
): boolean => {
  const res = env[arg];
  if (!res) {
    return defaultValue;
  }
  return "true" === res ? true : false;
};

const configByEnvironment: {
  [key in EnvironmentType]: any;
} = {
  "dev.factory": () => ({
    alertCron: "0 0 5 * * *",
    alertEmailCron: "0 0 6 * * *",
    mailEnabled: false,
    monthlyReportCron: "0 0 8 1 * *",
    monthlyReportEmailRecepient: "",
    sentryEnabled: false,
    validityCheckCleanerCron: "0 15 6 * * *",
    validityCheckCron: "0 15 * * * *"
  }),
  "dev.local": (env: typeof process.env) => ({
    alertCron: asString(env, "ALERT_CRON", "0 0 5 * * *"),
    alertEmailCron: asString(env, "ALERT_EMAIL_CRON", "0 0 5 * * *"),
    mailEnabled: asBoolean(env, "MAIL_ENABLED", false),
    monthlyReportCron: asString(env, "MONTHLY_REPORT_CRON", "0 0 6 * * *"),
    monthlyReportEmailRecepient: asString(
      env,
      "MONTHLY_REPORT_EMAIL_RECEPIENT",
      ""
    ),
    sentryEnabled: asBoolean(env, "SENTRY_ENABLED", false),
    validityCheckCleanerCron: asString(
      env,
      "VALIDITY_CHECK_CLEANER_CRON",
      "0 15 6 * * *"
    ),
    validityCheckCron: asString(env, "VALIDITY_CHECK_CRON", "0 0 * * * *")
  }),
  prod: () => ({
    alertCron: "0 15 * * * *",
    alertEmailCron: "0 30 6 * * *",
    mailEnabled: true,
    monthlyReportCron: "0 0 8 1 * *",
    monthlyReportEmailRecepient: "contact@work-in-france.fr",
    sentryEnabled: true,
    validityCheckCleanerCron: "0 15 6 * * *",
    validityCheckCron: "0 0 * * * *"
  })
};

export const getConfiguration = (env: typeof process.env) => {
  const environmentType =
    (env.ENVIRONMENT_TYPE as EnvironmentType) || "dev.local";
  const envConfigFn = configByEnvironment[environmentType];
  const envConfig = envConfigFn(env);

  return {
    alertCron: envConfig.alertCron,
    alertEmailCron: envConfig.alertEmailCron,
    apiPort: asNumber(env, "API_PORT", 4000),
    apiPrefix: asString(env, "API_PREFIX", "local"),
    dsAPI: asString(env, "DS_API", ""),
    dsApiLogin: asString(env, "DS_API_LOGIN", ""),
    dsApiPassword: asString(env, "DS_API_PASSWORD", ""),
    kintoLogin: asString(env, "KINTO_LOGIN", ""),
    kintoPassword: asString(env, "KINTO_PASSWORD", ""),
    kintoURL: asString(env, "KINTO_URL", ""),
    mailEnabled: envConfig.mailEnabled,
    mailFrom: asString(env, "MAIL_FROM", ""),
    mailHost: asString(env, "MAIL_HOST", ""),
    mailPassword: asString(env, "MAIL_PASSWORD", ""),
    mailPort: asNumber(env, "MAIL_PORT", 465),
    mailUseTLS: asBoolean(env, "MAIL_USE_TLS", false),
    mailUsername: asString(env, "MAIL_USERNAME", ""),
    monthlyReportCron: envConfig.monthlyReportCron,
    monthlyReportEmailRecepient: envConfig.monthlyReportEmailRecepient,
    sentryDSN: asString(env, "SENTRY_DSN", ""),
    sentryEnabled: envConfig.sentryEnabled,
    validityCheckCleanerCron: envConfig.validityCheckCleanerCron,
    validityCheckCron: envConfig.validityCheckCron
  };
};
