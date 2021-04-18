import express from "express";
import { router as ProductsRouter } from "./Products";
import { router as CartRouter } from "./Cart";
import { router as AuthRouter } from "./Auth";

import { isLogged } from "../middlewares/auth";

const routers = express.Router();
routers.use("/products", isLogged, ProductsRouter);
routers.use("/cart", isLogged, CartRouter);
routers.use("/auth", AuthRouter);

export default routers;
