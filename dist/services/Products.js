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
exports.generateFakeProducts = exports.deleteById = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const uuid_1 = require("uuid");
const es_1 = __importDefault(require("faker/locale/es"));
const Product_1 = require("../models/Product");
const hiddenFields = { _id: 0, __v: 0 };
const getAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.Product.find(Object.assign({}, mapFiltersToMongo(filters)), hiddenFields);
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
function mapFiltersToMongo(filters) {
    if (!filters)
        return {};
    let mongoQuery = {};
    for (let [k, v] of Object.entries(filters)) {
        if (k === "name")
            mongoQuery = Object.assign(Object.assign({}, mongoQuery), { [k]: v });
        else if (k === "code")
            mongoQuery = Object.assign(Object.assign({}, mongoQuery), { [k]: v });
        else if (["price", "stock"].includes(k))
            mongoQuery = Object.assign(Object.assign({}, mongoQuery), (Object.keys(v).includes("eq")
                ? { [k]: { $eq: v.eq } }
                : {
                    $and: Object.entries(v).reduce((numberQuery, curr) => {
                        return ["gt", "gte", "lt", "lte"].includes(curr[0])
                            ? [...numberQuery, { [k]: { ["$" + curr[0]]: curr[1] } }]
                            : numberQuery;
                    }, []),
                }));
    }
    return mongoQuery;
}
const generateFakeProducts = (q = 10) => {
    const productArray = [];
    let iterate = Math.abs(q);
    while (iterate--)
        productArray.push({
            code: es_1.default.commerce.product(),
            description: es_1.default.commerce.productDescription(),
            id: es_1.default.datatype.uuid(),
            name: es_1.default.commerce.productName(),
            price: Number(es_1.default.commerce.price(10, 1000, 2)),
            stock: es_1.default.datatype.number({ precision: 0, min: 0, max: 300 }),
            thumbnail: es_1.default.image.fashion(),
            timestamp: String(es_1.default.datatype.datetime(Number(new Date()))),
        });
    return productArray;
};
exports.generateFakeProducts = generateFakeProducts;
