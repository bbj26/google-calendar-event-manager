import { Router } from "express";
import {
  getAuthUrl,
  handleGoogleRedirect,
} from "../controllers/auth.controller";

const router = Router();

router.get("/google", getAuthUrl);
router.get("/google/redirect", handleGoogleRedirect);

export default router;
