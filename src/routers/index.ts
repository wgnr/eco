import express from "express";
import { router as AuthRouter } from "./Auth";
import { router as CartRouter } from "./Cart";
import { router as InfoRouter } from "./Info";
import { router as RandomsRouter } from "./Randoms";
import { router as ProductsRouter } from "./Products";
import { checkIsAuthenticatedAPI } from "../auth";

const routers = express.Router();

routers.use("/auth", AuthRouter);
routers.use("/cart", checkIsAuthenticatedAPI, CartRouter);
routers.use("/info", InfoRouter);
routers.use("/randoms", RandomsRouter);
routers.use("/products", checkIsAuthenticatedAPI, ProductsRouter);

export default routers;
