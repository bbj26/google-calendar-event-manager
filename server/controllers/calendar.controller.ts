import { Request, Response } from "express";
import { listEvents } from "../services/calendar.service";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await listEvents();
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
