"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const User_get_dto_1 = require("../models/User/User.get-dto");
const COOKIE_USERNAME_KEY = "user";
exports.router = express_1.default.Router();
const commonLoginRedirect = (req, res) => {
    var _a;
    res.cookie(COOKIE_USERNAME_KEY, (_a = req.user.firstname) === null || _a === void 0 ? void 0 : _a.trim()).redirect("/");
};
exports.router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(new User_get_dto_1.UserGetDTO(req.user));
    }
    return res.status(400).end();
});
exports.router.post("/login", passport_1.default.authenticate("login", {
    failureMessage: true,
    failureRedirect: "/auth/error-login.html",
    successMessage: true,
}), commonLoginRedirect);
exports.router.post("/signup", passport_1.default.authenticate("signup", {
    failureMessage: true,
    failureRedirect: "/auth/error-signup.html",
    session: false,
    successMessage: true,
}), (req, res) => {
    res.redirect("/");
});
exports.router.post("/logout", (req, res) => {
    req.logOut();
    req.session.destroy((err) => {
        if (err)
            return res.status(500).send("Error");
        res.redirect("/auth/logout.html");
    });
});
exports.router.get("/facebook", passport_1.default.authenticate("facebook", {
    scope: ["email", "public_profile"],
}));
exports.router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: "/auth/error-login.html",
}), commonLoginRedirect);
