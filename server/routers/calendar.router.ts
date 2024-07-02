import { Router } from "express";
import { getEvents } from "../controllers/calendar.controller";
import { checkAuth } from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, getEvents);

export default router;
