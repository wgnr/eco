import { GlobalVars } from "./config"
import cluster from "cluster";
import { cpus } from "os";
import { logger } from "./utils/logger";

const { server: { MODE_SERVER } } = GlobalVars

if (MODE_SERVER == "CLUSTER" && cluster.isMaster) {
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
