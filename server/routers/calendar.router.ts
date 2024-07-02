import { Router } from "express";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getEvents,
  updateCalendarEvent,
} from "../controllers/calendar.controller";
import { checkAuth } from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, getEvents);
router.post("/create-event", checkAuth, createCalendarEvent);
router.put("/update-event/:eventId", checkAuth, updateCalendarEvent);
router.delete("/delete-event/:eventId", checkAuth, deleteCalendarEvent);

export default router;
