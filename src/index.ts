import dotenv from "dotenv";
dotenv.config();

import cluster from "cluster";
import { cpus } from "os";
import { logger } from "./config";

if (process.argv[3] == "CLUSTER" && cluster.isMaster) {
  const CPUnum = cpus().length;
  logger.logger.info(`CPU Threads: ${CPUnum}`);
  logger.logger.info(`MASTER PID ${process.pid}`);

  for (let i = 0; i < CPUnum; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.logger.info("Worker", worker.process.pid, "exited");
  });
} else {
  import("./server");
}
