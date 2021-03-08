"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIsUser = exports.CheckIsAdmin = void 0;
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
