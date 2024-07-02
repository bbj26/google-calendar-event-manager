import express, { Request, Response } from "express";
import { config } from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: config.CLIENT_APP_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to server");
});

app.listen(config.SERVER_PORT, () => {
  console.log(`Server listening on port ${config.SERVER_PORT}`);
});
