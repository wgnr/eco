"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const CheckIsAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const isAdmin = true;
//   if (!isAdmin)
//     return res.status(403).json({
//       error: -1,
//       description: `You are not authorized for the path ${req.originalUrl}`,
//     });
//   return next();
// };
// export const CheckIsUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const isUser = true;
//   if (!isUser)
//     return res.status(403).json({
//       error: -1,
//       description: `You are not authorized for the path ${req.originalUrl}`,
//     });
//   res.locals.userId = "USER-ID";
//   if (isUser) return next();
// };
// passport.use(
//   "login",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     (req, email, password, done) => {
//       User.findOne({ email }, (err: Error, user: IUsers) => {
//         if (err) return done(err);
//         if (!user) {
//           console.log(`User not found with username ${email}`);
//           req.logOut();
//           return done(null, false);
//         }
//         if (!isValidPassword(password, user.password)) {
//           console.log(`Invalid password for ${email}`);
//           req.logOut();
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
// passport.use(
//   "signup",
//   new LocalStrategy(
//     { passReqToCallback: true, usernameField: "email" },
//     (req, email, password, done) => {
//       process.nextTick(() => {
//         User.findOne({ email }, (err: Error, user: IUsers) => {
//           if (err) {
//             console.error("Error in signup", err);
//             return done(err);
//           }
//           if (user) {
//             console.error(`Email already exists`);
//             return done(null, false, { message: `${email} already exists` });
//           }
//           const { firstname, lastname } = req.body;
//           const newUser = new User(
//             new UserCreateDTO(email, firstname, lastname, password)
//           );
//           newUser.save((err) => {
//             if (err) {
//               console.log(`error in saving email ${email}`);
//               throw err;
//             }
//             console.log("User registration succesful");
//             return done(null, newUser);
//           });
//         });
//       });
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
// passport.deserializeUser((_id: string, done) => {
//   User.findById(_id, (err: Error, user: IMUsers) => done(err, user));
// });
// const isValidPassword = (password: string, hashUserPassword: string) =>
//   bCrypt.compareSync(password, hashUserPassword);
// export const checkIsAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   return req.isAuthenticated() ? next() : res.redirect("/auth/login.html");
// };
// export const checkIsAuthenticatedAPI = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   return req.isAuthenticated()
//     ? next()
//     : res.status(400).send("you have to login");
// };
