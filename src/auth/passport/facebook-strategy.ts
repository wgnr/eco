import { isArray } from "node:util";
import passport from "passport";
import {
  Strategy as FacebookStrategy,
  Profile,
  StrategyOption,
} from "passport-facebook";
import { disposeEmitNodes } from "typescript";
import { IUsers, IMUsers, User } from "../../models/User/Users";
import { logger } from "../../utils/logger";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || "",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "",
      callbackURL: "http://localhost:3000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "first_name", "email", "photos"],
    },
    (accessToken, refreshToken, profile: Profile, done) => {
      logger.logger.info("profile", profile);
      User.findOne(
        { "social.facebook.id": profile.id },
        (err: Error, user: IUsers) => {
          if (err) {
            logger.logger.error("Error in signup", err);
            return done(err);
          }

          if (!user) {
            // Create
            const newUser = new User();
            newUser.firstname = profile.name?.givenName || profile.displayName;
            if (profile.emails) {
              newUser.email = profile.emails[0].value;
            }
            if (profile.photos) {
              newUser.photo = profile.photos[0].value;
            }

            newUser.social = { facebook: profile._json };

            newUser.save((err) => {
              if (err) {
                logger.logger.error(
                  `error in saving new facebook user ${profile.id}`
                );
                throw err;
              }

              logger.logger.info("User registration succesful");
              return done(null, newUser);
            });
          } else {
            return done(null, user);
          }
        }
      );
    }
  )
);
