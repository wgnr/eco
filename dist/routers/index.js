"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Products_1 = require("./Products");
const Cart_1 = require("./Cart");
const routers = express_1.default.Router();
routers.use("/products", Products_1.router);
routers.use("/cart", Cart_1.router);
exports.default = routers;
