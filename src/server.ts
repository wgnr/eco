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
import compression from "compression";
import { logger } from "./utils/logger";

const app: Application = express();
const PORT = Number(process.env.PORT) || 8080;

logger.logger.info("Starting server...");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use("/api", APIRouters);
app.use("/auth", express.static(`${__dirname}/public/auth`));
app.use("/", checkIsAuthenticated, express.static(`${__dirname}/public`));

// Default redirection...
app.get("*", (req: Request, res: Response) => {
  req.log.info("Invalid route was requested, redirecting to /");
  res.redirect("/");
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  req.log.error("Am error has happened!");
  res.status(500).send("Something broke!");
});

app
  .listen(PORT, () => {
    logger.logger.info(`✔ Server running at https://localhost:${PORT}`);

    mongoose
      // .connect("mongodb://localhost/ecommerce", {
      .connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((r) => logger.logger.info(`✔ Connected to DB`))
      .catch((e) => {
        logger.logger.error(e, `❌ Cannot connect to DB... exiting... `);
        process.exit();
      });
  })
  .on("error", (error) => {
    logger.logger.error(error, `Error in server!!!!!`);
    process.exit(1);
  });

process.on("exit", (code) => {
  logger.logger.info(`About to exit with code: ${code}`);
});
