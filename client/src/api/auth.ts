import axios from "axios";
import { handleApiError } from "../utils/errorHandlers";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await axiosClient.get("/google/verify");
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};

export const getCalendarEvents = async () => {
  try {
    const response = await axiosClient.get("/calendar");
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const createCalendarEvent = async (event: any) => {
  try {
    const response = await axiosClient.post("/calendar/create-event", event);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};
