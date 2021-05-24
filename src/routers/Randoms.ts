import express, { Request, Response } from "express";
import { fork } from "child_process";

export const router = express.Router();

const { DISABLE_CHILD_PROCESS } = process.env;
const randomNumberPath = `${__dirname}/../utils/getRandomNumbers`;

router.get("", async (req: Request, res: Response) => {
  const cant = Math.abs(Number(req.query.cant)) || 1e8;

  if (DISABLE_CHILD_PROCESS) {
    const { calculate } = await import(randomNumberPath);
    res.json({
      msg: calculate(cant),
    });
  } else {
    // https://github.com/TypeStrong/ts-node/issues/619#issuecomment-511366883
    const forkProcess = fork(randomNumberPath, [], {
      execArgv: ["-r", "ts-node/register"],
    });

    forkProcess.send(cant);
    forkProcess.on("message", (msg) => {
      res.json({
        msg,
      });
      forkProcess.kill();
    });
  }
});
