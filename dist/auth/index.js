"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAuthenticatedAPI = exports.checkIsAuthenticated = exports.CheckIsUser = exports.CheckIsAdmin = void 0;
// Active passport
require("./passport");
const CheckIsAdmin = (req, res, next) => {
    const isAdmin = true;
    if (!isAdmin)
        return res.status(403).json({
            error: -1,
            description: `You are not authorized for the path ${req.originalUrl}`,
        });
    return next();
};
exports.CheckIsAdmin = CheckIsAdmin;
const CheckIsUser = (req, res, next) => {
    const isUser = true;
    if (!isUser)
        return res.status(403).json({
            error: -1,
            description: `You are not authorized for the path ${req.originalUrl}`,
        });
    res.locals.userId = "USER-ID";
    if (isUser)
        return next();
};
exports.CheckIsUser = CheckIsUser;
const checkIsAuthenticated = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/auth/login.html");
};
exports.checkIsAuthenticated = checkIsAuthenticated;
const checkIsAuthenticatedAPI = (req, res, next) => {
    return req.isAuthenticated()
        ? next()
        : res.status(400).send("you have to login");
};
exports.checkIsAuthenticatedAPI = checkIsAuthenticatedAPI;
