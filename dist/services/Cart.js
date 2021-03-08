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
exports.deleteFromCart = exports.addToCart = exports.getProductById = exports.getAllProducts = void 0;
const _1 = require(".");
const FilePersistence_1 = __importDefault(require("../db/FilePersistence"));
const CartList = new FilePersistence_1.default("CartList.db");
const getUserCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield CartList.getById(userId);
    if (!userCart)
        throw new Error("Cart not found");
    return userCart;
});
const getAllProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield getUserCart(userId);
    return (userCart === null || userCart === void 0 ? void 0 : userCart.products) ? userCart.products : [];
});
exports.getAllProducts = getAllProducts;
const getProductById = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userCart = yield CartList.getById(userId);
    const product = (_a = userCart.products) === null || _a === void 0 ? void 0 : _a.filter((p) => p.id === productId);
    return product;
});
exports.getProductById = getProductById;
const addToCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield getUserCart(userId);
    const product = yield _1.ProductServices.getById(productId);
    if (!product)
        throw new Error(`Product not found!`);
    if (!Array.isArray(userCart === null || userCart === void 0 ? void 0 : userCart.products))
        userCart.products = [];
    userCart.timestamp = new Date().toISOString();
    userCart.products.push(product);
    const addProductToCart = yield CartList.update(userId, userCart);
    if (!addProductToCart)
        throw new Error("Can't save cart in DB");
    return userCart;
});
exports.addToCart = addToCart;
const deleteFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userCart = yield getUserCart(userId);
    const productIndex = (_b = userCart === null || userCart === void 0 ? void 0 : userCart.products) === null || _b === void 0 ? void 0 : _b.findIndex((p) => p.id === productId);
    if (productIndex === undefined)
        throw new Error(`Product not found!`);
    userCart.timestamp = new Date().toISOString();
    userCart.products.splice(productIndex, 1);
    const addProductToCart = yield CartList.update(userId, userCart);
    if (!addProductToCart)
        throw new Error("Can't save cart in DB");
    return;
});
exports.deleteFromCart = deleteFromCart;
