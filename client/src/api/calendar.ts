import { handleApiError } from "../utils/errorHandlers";
import { axiosClient } from "./auth";

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

export const updateCalendarEvent = async (
  eventId: string,
  updatedEventBody: any
) => {
  try {
    const response = await axiosClient.put(
      `/calendar/update-event/${eventId}`,
      { updatedEventBody }
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const deleteCalendarEvent = async (eventId: string) => {
  try {
    const response = await axiosClient.delete(
      `/calendar/delete-event/${eventId}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};
