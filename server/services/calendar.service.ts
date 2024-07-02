import { google } from "googleapis";
import { oauth2Client } from "./auth.service";
import { config } from "../config/index";

const { API_KEY } = config;
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const listEvents = async () => {
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  });
  return response.data.items || [];
};
