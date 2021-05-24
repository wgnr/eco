import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUsers, IMUsers, User } from "../../models/User/Users";
import { UserCreateDTO } from "../../models/User/User.create-dto";
import bCrypt from "bcryptjs";
import { logger } from "../../utils/logger";

const isValidPassword = (password: string, hashUserPassword: string) =>
  bCrypt.compareSync(password, hashUserPassword);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    (req, email, password, done) => {
      User.findOne({ email }, (err: Error, user: IUsers) => {
        if (err) return done(err);

        if (!user) {
          logger.logger.info(`User not found with username ${email}`);
          req.logOut();
          return done(null, false);
        }

        if (!isValidPassword(password, user.password!)) {
          logger.logger.info(`Invalid password for ${email}`);
          req.logOut();
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ email }, (err: Error, user: IUsers) => {
          if (err) {
            logger.logger.error("Error in signup", err);
            return done(err);
          }

          if (user) {
            logger.logger.error(`Email already exists`);
            return done(null, false, { message: `${email} already exists` });
          }

          const { firstname, lastname } = req.body;
          const newUser = new User(
            new UserCreateDTO(email, firstname, lastname, password)
          );

          newUser.save((err) => {
            if (err) {
              logger.logger.info(`error in saving email ${email}`);
              throw err;
            }

            logger.logger.info("User registration succesful");
            return done(null, newUser);
          });
        });
      });
    }
  )
);
