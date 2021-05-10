import express, { Request, Response } from "express";
import { fork } from "child_process";

export const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  const cant = Math.abs(Number(req.query.cant)) || 1e8;

  // https://github.com/TypeStrong/ts-node/issues/619#issuecomment-511366883
  const forkProcess = fork(`${__dirname}/../utils/getRandomNumbers`, [], {
    execArgv: ["-r", "ts-node/register"],
  });

  forkProcess.send(cant);
  forkProcess.on("message", (msg) => {
    res.json({
      msg,
    });
    forkProcess.kill();
  });
});
