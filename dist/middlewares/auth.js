"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAuthenticatedAPI = exports.checkIsAuthenticated = exports.CheckIsUser = exports.CheckIsAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Users_1 = require("../models/User/Users");
const User_create_dto_1 = require("../models/User/User.create-dto");
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
passport_1.default.use("login", new passport_local_1.Strategy({ passReqToCallback: true, usernameField: "email" }, (req, email, password, done) => {
    Users_1.User.findOne({ email }, (err, user) => {
        if (err)
            return done(err);
        if (!user) {
            console.log(`User not found with username ${email}`);
            req.logOut();
            return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
            console.log(`Invalid password for ${email}`);
            req.logOut();
            return done(null, false);
        }
        return done(null, user);
    });
}));
passport_1.default.use("signup", new passport_local_1.Strategy({ passReqToCallback: true, usernameField: "email" }, (req, email, password, done) => {
    process.nextTick(() => {
        Users_1.User.findOne({ email }, (err, user) => {
            if (err) {
                console.error("Error in signup", err);
                return done(err);
            }
            if (user) {
                console.error(`Email already exists`);
                return done(null, false, { message: `${email} already exists` });
            }
            const { firstname, lastname } = req.body;
            const newUser = new Users_1.User(new User_create_dto_1.UserCreateDTO(email, firstname, lastname, password));
            newUser.save((err) => {
                if (err) {
                    console.log(`error in saving email ${email}`);
                    throw err;
                }
                console.log("User registration succesful");
                return done(null, newUser);
            });
        });
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((_id, done) => {
    Users_1.User.findById(_id, (err, user) => done(err, user));
});
const isValidPassword = (password, hashUserPassword) => bcryptjs_1.default.compareSync(password, hashUserPassword);
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
