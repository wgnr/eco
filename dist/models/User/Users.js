"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UsersCollection = "users";
const UsersSchema = new mongoose_1.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
});
exports.User = mongoose_1.model(UsersCollection, UsersSchema);
