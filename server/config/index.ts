import dotenv from "dotenv";
import path from "path";
import { Dialect } from "sequelize";

const env = process.env.NODE_ENV || "development";
const envFilePath = path.resolve(__dirname, `../.env.${env}`);

dotenv.config({ path: envFilePath });

const requiredEnvVars = [
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_URL",
  "API_KEY",
  "CLIENT_APP_URL",
  "SERVER_DOMAIN",
  "DATABASE_NAME",
  "DATABASE_DIALECT",
  "DATABASE_USERNAME",
  "DATABASE_PASSWORD",
  "DATABASE_HOST",
  "DATABASE_PORT",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URL: process.env.REDIRECT_URL,
  API_KEY: process.env.API_KEY,
  SERVER_PORT: process.env.PORT || 8000,
  CLIENT_APP_URL: process.env.CLIENT_APP_URL,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN,
  database: {
    DB_NAME: process.env.DATABASE_NAME,
    DATABASE_DIALECT: process.env.DATABASE_DIALECT as Dialect,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
  },
};
