"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./Auth");
const Cart_1 = require("./Cart");
const Info_1 = require("./Info");
const Randoms_1 = require("./Randoms");
const Products_1 = require("./Products");
const auth_1 = require("../auth");
const routers = express_1.default.Router();
routers.use("/auth", Auth_1.router);
routers.use("/cart", auth_1.checkIsAuthenticatedAPI, Cart_1.router);
routers.use("/info", Info_1.router);
routers.use("/randoms", Randoms_1.router);
routers.use("/products", auth_1.checkIsAuthenticatedAPI, Products_1.router);
exports.default = routers;
