"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Users_1 = require("../../models/User/Users");
const User_create_dto_1 = require("../../models/User/User.create-dto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isValidPassword = (password, hashUserPassword) => bcryptjs_1.default.compareSync(password, hashUserPassword);
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
