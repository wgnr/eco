"use strict";
/*
More info about passport
https://github.com/jwalton/passport-api-docs
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const Users_1 = require("../../models/User/Users");
// Load strategies
require("./local-strategy");
require("./facebook-strategy");
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((_id, done) => {
    Users_1.User.findById(_id, (err, user) => done(err, user));
});
