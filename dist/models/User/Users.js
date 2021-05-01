"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UsersCollection = "users";
const UsersSchema = new mongoose_1.Schema({
    email: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
    photo: { type: String },
    social: { type: Object },
});
exports.User = mongoose_1.model(UsersCollection, UsersSchema);
