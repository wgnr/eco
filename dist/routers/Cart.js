"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth");
const index_1 = require("../services/index");
exports.router = express_1.default.Router();
exports.router.get("", auth_1.CheckIsAdmin, auth_1.CheckIsUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield index_1.CartServices.getAllProducts(res.locals.userId);
        return res.json(allProducts);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}));
exports.router.get("/:id", auth_1.CheckIsAdmin, auth_1.CheckIsUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const products = yield index_1.CartServices.getProductById(res.locals.userId, productId);
        return !products
            ? res.status(404).send(`Product ${productId} not found in user cart.`)
            : res.json(products);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}));
exports.router.post("/:id", auth_1.CheckIsAdmin, auth_1.CheckIsUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const userCart = yield index_1.CartServices.addToCart(res.locals.userId, productId);
        res.status(201).json(userCart);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
exports.router.delete("/:id", auth_1.CheckIsAdmin, auth_1.CheckIsUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        yield index_1.CartServices.deleteFromCart(res.locals.userId, productId);
        return res.sendStatus(204);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
