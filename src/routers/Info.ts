import express, { Request, Response } from "express";

export const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  res.json({
    message: {
      argv: process.argv,
      os: process.platform,
      nodejsVersion: process.version,
      memUse: process.memoryUsage(),
      execPath: process.execPath,
      pid: process.pid,
      cwd: process.cwd(),
    },
  });
});
