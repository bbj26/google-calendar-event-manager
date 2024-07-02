import { CookieOptions, Request, Response } from "express";
import { oauth2Client } from "../services/auth.service";
import { config } from "../config";
import axios from "axios";

const cookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: config.SERVER_DOMAIN,
  path: "/",
  sameSite: "strict",
  secure: false,
};
export const getAuthUrl = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  res.redirect(url);
};

export const handleGoogleRedirect = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    res.status(400).send("Missing code parameter");
    return;
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const { id_token, access_token } = tokens;
  res.cookie("access_token", access_token, cookieOptions);
  res.cookie("id_token", id_token, cookieOptions);

  // redirect back to client
  res.redirect(`${config.CLIENT_APP_URL}`);
};

export const isAuthenticated = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );

    if (response.data.audience === config.CLIENT_ID) {
      res.status(200).json({ message: "Authorized", user: response.data });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
