import { SessionOptions } from "express-session";

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET || "my-super-secrettASKLOjufdlaksjdklsaj",
  resave: true,
  saveUninitialized: true,
  rolling:true,
  cookie: { maxAge: Number(process.env.SESSION_COOKIE_MAXAGE) || 60 },
};
