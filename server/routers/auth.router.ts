import { Router } from "express";
import {
  getAuthUrl,
  handleGoogleRedirect,
  isAuthenticated,
} from "../controllers/auth.controller";

const router = Router();

router.get("/google/verify", isAuthenticated);
router.get("/google", getAuthUrl);
router.get("/google/redirect", handleGoogleRedirect);

export default router;
