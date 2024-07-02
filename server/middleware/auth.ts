import { Request, Response, NextFunction } from "express";
import { oauth2Client } from "../services/auth.service";
import { config } from "../config/index";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id_token = req.cookies["id_token"];
  const access_token = req.cookies["access_token"];
  if (id_token && access_token) {
    try {
      const ticket = await oauth2Client.verifyIdToken({
        idToken: id_token,
        audience: config.CLIENT_ID,
      });

      ticket.getPayload();

      oauth2Client.setCredentials({
        access_token,
      });

      next();
    } catch (err: any) {
      res.status(401).send("Invalid Google Auth access token");
      return;
    }
  } else {
    res.status(401).send("No Google Auth access token found");
    return;
  }
};
