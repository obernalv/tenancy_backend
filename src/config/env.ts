import { config as dotenvConfig } from 'dotenv';
import env from 'env-var';

dotenvConfig();

export const config = {
  PORT: env.get('PORT').default('3000').asPortNumber(),
  NODE_ENV: env.get('NODE_ENV').default('development').asString(),

  // JWT
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  JWT_REFRESH_SECRET: env.get('JWT_REFRESH_SECRET').required().asString(),

  // Otros...
};
