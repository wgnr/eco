/*
More info about passport
https://github.com/jwalton/passport-api-docs
*/

import passport from "passport";
import { IUsers, IMUsers, User } from "../../models/User/Users";

// Load strategies
import "./local-strategy";
import "./facebook-strategy";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id: string, done) => {
  User.findById(_id, (err: Error, user: IMUsers) => done(err, user));
});
