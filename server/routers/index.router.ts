import { Router } from "express";
import authRouter from "./auth.router";
import calendarRouter from "./calendar.router";

const router = Router();

router.use(authRouter);
router.use("/calendar", calendarRouter);

export default router;
