import { getConfiguration } from "../../../src/config/config";

//

const validEnv = {
  ALERT_CRON: "ALERT_CRON",
  ALERT_EMAIL_CRON: "ALERT_EMAIL_CRON",
  API_PORT: "123456",
  API_PREFIX: "API_PREFIX",
  DS_API: "DS_API",
  DS_API_LOGIN: "DS_API_LOGIN",
  DS_API_PASSWORD: "DS_API_PASSWORD",
  ENVIRONMENT_TYPE: "dev.local",
  KINTO_LOGIN: "KINTO_LOGIN",
  KINTO_PASSWORD: "KINTO_PASSWORD",
  KINTO_URL: "KINTO_URL",
  MAIL_ENABLED: "false",
  MAIL_FROM: "MAIL_FROM",
  MAIL_HOST: "MAIL_HOST",
  MAIL_PASSWORD: "MAIL_PASSWORD",
  MAIL_PORT: "465",
  MAIL_USERNAME: "MAIL_USERNAME",
  MAIL_USE_TLS: "false",
  MONTHLY_REPORT_CRON: "MONTHLY_REPORT_CRON",
  MONTHLY_REPORT_EMAIL_RECEPIENT: "MONTHLY_REPORT_EMAIL_RECEPIENT",
  SENTRY_DSN: "SENTRY_DSN",
  SENTRY_ENABLED: "true",
  VALIDITY_CHECK_CLEANER_CRON: "VALIDITY_CHECK_CLEANER_CRON",
  VALIDITY_CHECK_CRON: "VALIDITY_CHECK_CRON"
};

it("should return the env configuration", () => {
  const env = { ...validEnv };
  expect(getConfiguration(env)).toMatchInlineSnapshot(`
    Object {
      "alertCron": "ALERT_CRON",
      "alertEmailCron": "ALERT_EMAIL_CRON",
      "apiPort": 123456,
      "apiPrefix": "API_PREFIX",
      "dsAPI": "DS_API",
      "dsApiLogin": "DS_API_LOGIN",
      "dsApiPassword": "DS_API_PASSWORD",
      "kintoLogin": "KINTO_LOGIN",
      "kintoPassword": "KINTO_PASSWORD",
      "kintoURL": "KINTO_URL",
      "mailEnabled": false,
      "mailFrom": "MAIL_FROM",
      "mailHost": "MAIL_HOST",
      "mailPassword": "MAIL_PASSWORD",
      "mailPort": 465,
      "mailUseTLS": false,
      "mailUsername": "MAIL_USERNAME",
      "monthlyReportCron": "MONTHLY_REPORT_CRON",
      "monthlyReportEmailRecepient": "MONTHLY_REPORT_EMAIL_RECEPIENT",
      "sentryDSN": "SENTRY_DSN",
      "sentryEnabled": true,
      "validityCheckCleanerCron": "VALIDITY_CHECK_CLEANER_CRON",
      "validityCheckCron": "VALIDITY_CHECK_CRON",
    }
  `);
});

it("sentryEnabled should be false is not 'true'", () => {
  const env = { ...validEnv, SENTRY_ENABLED: "lol" };
  expect(getConfiguration(env).sentryEnabled).toBeFalsy();
});
