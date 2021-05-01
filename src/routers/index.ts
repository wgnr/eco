import express from "express";
import { router as ProductsRouter } from "./Products";
import { router as CartRouter } from "./Cart";
import { router as AuthRouter } from "./Auth";
import { checkIsAuthenticatedAPI } from "../auth";

const routers = express.Router();
routers.use("/products", checkIsAuthenticatedAPI, ProductsRouter);
routers.use("/cart", checkIsAuthenticatedAPI, CartRouter);
routers.use("/auth", AuthRouter);

export default routers;
