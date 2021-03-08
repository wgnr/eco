import express from "express";
import { router as ProductsRouter } from "./Products";
import { router as CartRouter } from "./Cart";

const routers = express.Router();
routers.use("/products", ProductsRouter);
routers.use("/cart", CartRouter);

export default routers;
