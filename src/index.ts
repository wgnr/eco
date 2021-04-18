import dotenv from "dotenv";
dotenv.config();

import path from "path";
__dirname = path.resolve();

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import session from "express-session";
import { sessionConfig } from "./config";
import APIRouters from "./routers";
import { isLogged } from "./middlewares/auth";
const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRouters);
app.use("/auth", express.static(`${__dirname}/public/auth`));
app.use("/", isLogged, express.static(`${__dirname}/public`));

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
    console.log(`✔ Server is running at https://localhost:${PORT}`);

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
  .on("error", (error) => console.error(`Error in server!!!!!\n${error}`));
