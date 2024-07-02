import { Router } from "express";
import {
  createCalendarEvent,
  getEvents,
} from "../controllers/calendar.controller";
import { checkAuth } from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, getEvents);
router.post("/create-event", checkAuth, createCalendarEvent);

export default router;
