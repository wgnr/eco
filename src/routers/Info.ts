import { GlobalVars } from "../config"
import express, { Request, Response } from "express";

export const router = express.Router();
const { logging: { ADD_CONSOLELOG_INFO } } = GlobalVars;

router.get("", async (req: Request, res: Response) => {
  const response = {
    message: {
      argv: process.argv,
      os: process.platform,
      nodejsVersion: process.version,
      memUse: process.memoryUsage(),
      execPath: process.execPath,
      pid: process.pid,
      cwd: process.cwd(),
    },
  };

  if (ADD_CONSOLELOG_INFO) console.log(response);

  res.json(response);
});
