import { GlobalVars } from "../config"
import { Request, Response } from "express";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join } from "path";
import pinoHttp from "pino-http";
import pinoms from "pino-multi-stream";

const { IS_PROD, logging: { PREVENT_CONSOLE_LOGGER } } = GlobalVars

const logFoler = join(__dirname, "..", "logs");
if (!existsSync(logFoler)) mkdirSync(logFoler, { recursive: true });

const intialStreams =
  !IS_PROD && !PREVENT_CONSOLE_LOGGER
    ? [{ stream: process.stdout }]
    : [];

export const logger = pinoHttp({
  logger: pinoms({
    streams: [
      ...intialStreams,
      { level: "warn", stream: createWriteStream(join(logFoler, "warn.log")) },
      {
        level: "error",
        stream: createWriteStream(join(logFoler, "error.log")),
      },
    ],
  }),

  serializers: {
    req: (req: Request) => ({
      id: req.id,
      sessionId: req.sessionID,
      method: req.method,
      url: req.url,
      user: req.user,
      body: req.raw.body,
      header: {
        host: req.headers.host,
        accept: req.headers.accept,
      },
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
    }),
  },

  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
});
