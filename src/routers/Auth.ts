import express, { Request, Response } from "express";
const COOKIE_USERNAME_KEY = "user";
export const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) return res.status(409).end("Missing user");

  req.session!.isLogged = true;
  res.cookie(COOKIE_USERNAME_KEY, user.trim()).redirect("/");
});

router.post("/logout", (req: Request, res: Response) => {
  req.session!.destroy((err) => {
    if (err) return res.status(500).send("Error");
    res.redirect("/auth/logout");
  });
});
