import { google } from "googleapis";
import { oauth2Client } from "./auth.service";

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const listEvents = async () => {
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: "startTime",
  });
  return response.data.items || [];
};

export const createEvent = async (event: any) => {
  const response = await calendar.events.insert({
    auth: oauth2Client,
    calendarId: "primary",
    requestBody: event,
  });
  return response.data;
};
