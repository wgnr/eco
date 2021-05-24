import dotenv from "dotenv";
dotenv.config();
// Get config from CLI
process.argv.slice(2).forEach((arg, i, arr) => {
  if (arg === "--mode") {
    if (["CLUSTER", "FORK"].includes(arr[i + 1]))
      process.env.MODE_SERVER = arr[i + 1];
  } else if (arg === "--port") {
    if (+arr[i + 1] > 0) process.env.PORT = arr[i + 1];
  } else if (arg === "--add-consolelog-info") {
    process.env.ADD_CONSOLELOG_INFO = "1";
  } else if (arg === "--disable-child-process") {
    process.env.DISABLE_CHILD_PROCESS = "1";
  } else if (arg === "--prevent-console-logger") {
    process.env.PREVENT_CONSOLE_LOGGER = "1";
  }
});

import cluster from "cluster";
import { cpus } from "os";
import { logger } from "./utils/logger";

if (process.env.MODE_SERVER == "CLUSTER" && cluster.isMaster) {
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
