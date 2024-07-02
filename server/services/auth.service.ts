import { google } from "googleapis";
import { config } from "../config";

export const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URL
);
