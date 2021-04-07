"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductsCollection = "productos";
const ProdcutSchema = new mongoose_1.Schema({
    id: { type: String, require: true },
    code: { type: String, require: true },
    description: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    thumbnail: { type: String, require: true },
    timestamp: { type: String, require: true },
});
exports.Product = mongoose_1.model(ProductsCollection, ProdcutSchema);
