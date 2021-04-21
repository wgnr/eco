"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const COOKIE_USERNAME_KEY = "user";
exports.router = express_1.default.Router();
exports.router.post("/login", (req, res) => {
    const { user } = req.body;
    if (!user)
        return res.status(409).end("Missing user");
    req.session.isLogged = true;
    res.cookie(COOKIE_USERNAME_KEY, user.trim()).redirect("/");
});
exports.router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res.status(500).send("Error");
        res.redirect("/auth/logout");
    });
});
