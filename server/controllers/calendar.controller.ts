import { Request, Response } from "express";
import {
  createEvent,
  deleteEvent,
  listEvents,
  updateEvent,
} from "../services/calendar.service";
import { Log } from "../database";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await listEvents();
    await Log.create({
      method: "GET",
      event_summary: "All events",
    });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCalendarEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const createdEvent = await createEvent(event);
    await Log.create({
      method: "POST",
      event_summary: createdEvent.summary,
    });
    res.json(createdEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { updatedEventBody } = req.body;
    const updatedEvent = await updateEvent(eventId, updatedEventBody);
    await Log.create({
      method: "PUT",
      event_summary: updatedEvent.summary,
    });
    res.json(updatedEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const deleted = await deleteEvent(eventId);
    await Log.create({
      method: "DELETE",
      event_summary: eventId,
    });
    res.json(deleted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
