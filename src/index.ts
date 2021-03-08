import express, { Request, Response } from "express";
import APIRouters from "./routers";
const app = express();
const PORT = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", APIRouters);

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    error: -2,
    description: "",
  });
});

app
  .listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  })
  .on("error", (error) => console.error(`Error in server!!!!!\n${error}`));
