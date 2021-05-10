import dotenv from "dotenv";
dotenv.config();

import cluster from "cluster";
import { cpus } from "os";

if (process.argv[3] == "CLUSTER" && cluster.isMaster) {
  const CPUnum = cpus().length;
  console.log(`CPU Threads: ${CPUnum}`);
  console.log(`MASTER PID ${process.pid}`);

  for (let i = 0; i < CPUnum; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log("Worker", worker.process.pid, "exited");
  });
} else {
  import("./server");
}
