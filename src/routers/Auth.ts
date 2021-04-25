import express, { Request, Response } from "express";
import passport from "passport";
import { UserGetDTO } from "../models/User/User.get-dto";

const COOKIE_USERNAME_KEY = "user";
export const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.json(new UserGetDTO(req.user));
  }

  return res.status(400).end();
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: true,
    failureRedirect: "/auth/error-login.html",
    successMessage: true,
  }),
  (req: Request, res: Response) => {
    res.cookie(COOKIE_USERNAME_KEY, req.user!.firstname?.trim()).redirect("/");
  }
);

router.post(
  "/signup",
  passport.authenticate("signup", {
    failureMessage: true,
    failureRedirect: "/auth/error-signup.html",
    session: false,
    successMessage: true,
  }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

router.post("/logout", (req: Request, res: Response) => {
  req.logOut();
  req.session!.destroy((err) => {
    if (err) return res.status(500).send("Error");
    res.redirect("/auth/logout.html");
  });
});
