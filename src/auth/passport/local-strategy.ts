import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUsers, IMUsers, User } from "../../models/User/Users";
import { UserCreateDTO } from "../../models/User/User.create-dto";
import bCrypt from "bcryptjs";

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
            console.error("Error in signup", err);
            return done(err);
          }

          if (user) {
            console.error(`Email already exists`);
            return done(null, false, { message: `${email} already exists` });
          }

          const { firstname, lastname } = req.body;
          const newUser = new User(
            new UserCreateDTO(email, firstname, lastname, password)
          );

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
    }
  )
);
