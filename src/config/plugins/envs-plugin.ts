import * as env from 'env-var';

export const envs = {
  API_NAME: env.get('API_NAME').asString(),
  PORT: env.get('PORT').required().asPortNumber(),
  PROD: env.get('PROD').required().asBool(),

  MAIL_MAILER: env.get('MAIL_MAILER').asString(),
  MAIL_HOST: env.get('MAIL_HOST').required().asString(),
  MAIL_PORT: env.get('MAIL_PORT').required().asPortNumber(),
  MAIL_USERNAME: env.get('MAIL_USERNAME').required().asString(),
  MAIL_PASSWORD: env.get('MAIL_PASSWORD').required().asString(),
  MAIL_ENCRYPTION: env.get('MAIL_ENCRYPTION').asString(),
  MAIL_FROM_ADDRESS: env.get('MAIL_FROM_ADDRESS').asString(),
  MAIL_FROM_NAME: env.get('MAIL_FROM_NAME').asString(),
};
