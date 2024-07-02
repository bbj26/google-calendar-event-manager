import { Request, Response } from "express";
import { createEvent, listEvents } from "../services/calendar.service";

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
