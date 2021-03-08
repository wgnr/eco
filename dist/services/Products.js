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
exports.deleteById = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const uuid_1 = require("uuid");
const FilePersistence_1 = __importDefault(require("../db/FilePersistence"));
const ProductList = new FilePersistence_1.default("ProductList.db");
const products = [];
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const productList = yield ProductList.getAll();
    return productList;
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductList.getById(id);
    return product;
});
exports.getById = getById;
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = Object.assign(Object.assign({}, body), { timestamp: new Date().toISOString(), id: uuid_1.v4() });
    const createdProduct = yield ProductList.add(newProduct);
    if (!createdProduct)
        throw new Error("Can't save product in DB");
    return createdProduct;
});
exports.create = create;
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductList.update(id, body);
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield ProductList.delete(id)))
        throw new Error("Can't delete product");
    return;
});
exports.deleteById = deleteById;
