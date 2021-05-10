import path from "path";
__dirname = path.resolve();

import express, { Request, Response, NextFunction, Application } from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { sessionConfig } from "./config";
import APIRouters from "./routers";
import { checkIsAuthenticated } from "./auth/index";

const app: Application = express();
const PORT =
  parseInt(process.argv[2]) ||
  Number(process.env.SERVER_PORT) ||
  Number(process.env.PORT) ||
  8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Reads cookies req.cookies
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.url}`);
  next();
});
app.use("/api", APIRouters);
app.use("/auth", express.static(`${__dirname}/public/auth`));
app.use("/", checkIsAuthenticated, express.static(`${__dirname}/public`));

// Default redirection...
app.get("*", (req: Request, res: Response) => {
  res.redirect("/");
});
app.use("*", (req: Request, res: Response) => {
  res.status(400).json({
    error: -2,
    description: `Path ${req.originalUrl} is not implemented.`,
  });
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app
  .listen(PORT, () => {
    console.log(`✔ pid ${process.pid} is running at https://localhost:${PORT}`);

    mongoose
      .connect("mongodb://localhost/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((r) => console.log(`✔ Connected to DB`))
      .catch((e) => {
        console.error(`❌ Cannot connect to DB... exiting... `);
        console.error(e);
        process.exit();
      });
  })
  .on("error", (error) => {
    console.error(`Error in server!!!!!\n${error}`);
    process.exit(1);
  });

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});
