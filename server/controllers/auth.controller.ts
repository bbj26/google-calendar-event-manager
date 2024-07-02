import { CookieOptions, Request, Response } from "express";
import { oauth2Client } from "../services/auth.service";
import { config } from "../config";

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
  console.log({ tokens });

  oauth2Client.setCredentials(tokens);

  const { id_token, access_token } = tokens;
  console.log({ id_token, access_token });

  res.cookie("access_token", access_token, cookieOptions);
  res.cookie("id_token", id_token, cookieOptions);

  // redirect back to client
  res.redirect(`${config.CLIENT_APP_URL}`);
};
