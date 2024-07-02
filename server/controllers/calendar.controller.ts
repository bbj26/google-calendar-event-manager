import { Request, Response } from "express";
import {
  createEvent,
  deleteEvent,
  listEvents,
  updateEvent,
} from "../services/calendar.service";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await listEvents();
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCalendarEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const createdEvent = await createEvent(event);
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
    res.json(updatedEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const deleted = await deleteEvent(eventId);
    res.json(deleted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
