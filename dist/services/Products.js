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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const uuid_1 = require("uuid");
const Product_1 = require("../models/Product");
const hiddenFields = { _id: 0, __v: 0 };
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.Product.find({}, hiddenFields);
    return products;
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ id }, hiddenFields);
    return product;
});
exports.getById = getById;
const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = Object.assign(Object.assign({}, body), { timestamp: new Date().toISOString(), id: uuid_1.v4() });
    const createdProduct = yield Product_1.Product.create(newProduct);
    return createdProduct;
});
exports.create = create;
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.Product.findOneAndUpdate({ id }, { $set: Object.assign({}, body) });
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Product_1.Product.findOneAndDelete({ id });
    return;
});
exports.deleteById = deleteById;
