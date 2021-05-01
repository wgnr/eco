"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const Users_1 = require("../../models/User/Users");
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID || "",
    clientSecret: process.env.FACEBOOK_APP_SECRET || "",
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ["id", "displayName", "first_name", "email", "photos"],
}, (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile);
    Users_1.User.findOne({ "social.facebook.id": profile.id }, (err, user) => {
        var _a;
        if (err) {
            console.error("Error in signup", err);
            return done(err);
        }
        if (!user) {
            // Create
            const newUser = new Users_1.User();
            newUser.firstname = ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || profile.displayName;
            if (profile.emails) {
                newUser.email = profile.emails[0].value;
            }
            if (profile.photos) {
                newUser.photo = profile.photos[0].value;
            }
            newUser.social = { facebook: profile._json };
            newUser.save((err) => {
                if (err) {
                    console.log(`error in saving new facebook user ${profile.id}`);
                    throw err;
                }
                console.log("User registration succesful");
                return done(null, newUser);
            });
        }
        else {
            return done(null, user);
        }
    });
}));
