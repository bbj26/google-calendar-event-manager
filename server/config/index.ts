import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_URL",
  "API_KEY",
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
};
