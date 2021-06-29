import { GlobalVars } from "../../config"
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
import { sendEmailOnEvent } from "../../utils/email";

const { auth: { socials: { facebook: { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } } } } = GlobalVars

const sendEmail = (user: IUsers) => {
  const { photo } = user;
  const { email, username } = user.social!.facebook!;
  sendEmailOnEvent("ethereal", email!, username!, "login", photo);
};

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID || "",
      clientSecret: FACEBOOK_APP_SECRET || "",
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
              sendEmail(newUser);
              return done(null, newUser);
            });
          } else {
            sendEmail(user);
            return done(null, user);
          }
        }
      );
    }
  )
);
