import { GlobalVars } from "../../config"
import { Request, Response, NextFunction } from "express";
import bCrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const tokenSecret = GlobalVars.auth.TOKEN_SECRET;
import { router } from "../../routers/Auth";
import { User, IMUsers, IUsers } from "../../models/User/Users";
import { UserCreateDTO } from "../../models/User/User.create-dto";
import { UserGetDTO } from "../../models/User/User.get-dto";
import { logger } from "../../utils/logger";

const generateToken = (user: IUsers) =>
  jwt.sign({ data: user }, tokenSecret, { expiresIn: "1s" });

const generateTokenResponser = (user: IMUsers) => ({
  token: generateToken(new UserGetDTO(user)),
});

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization)
    return res.status(400).json({ message: "Need authorization" });

  const [type, token] = req.headers.authorization.split(" ");

  if (type !== "Bearer")
    return res.status(403).json({ message: "Invalid method" });
  if (!token) return res.status(403).json({ message: "Insert token" });

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ message: "failed to authenticate token", err });

    if (!decoded) return res.status(500).json({ message: "no data decoded" });

    // @ts-ignore
    res.locals.user = decoded?.data;
    next();
  });
};

router.get("/testJWT", verify, (req, res) => {
  res.json({ message: "ok", data: res.locals.user });
});

router.post("/registerJWT", async (req: Request, res: Response) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const user = await User.findOne({ email });
    logger.logger.info({ user });

    if (user) return res.status(409).json({ message: "Already exitst" });

    const newUser = new User(
      new UserCreateDTO(email, firstname, lastname, password)
    );

    newUser.save((err, savedUser) => {
      if (err) {
        logger.logger.info(`error in saving email ${email}`);
        throw err;
      }
      res.status(200).json(generateTokenResponser(savedUser));
    });
  } catch (e) {
    res.json({ error: `${e.message}` });
  }
});

router.post("/loginJWT", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password)
      return res.status(400).json({ message: "Used social media to login" });

    if (!bCrypt.compareSync(password, user.password))
      return res.status(400).json({ message: "Wrong pass" });

    return res.status(200).json(generateTokenResponser(user));
  } catch (e) {
    res.json({ error: `${e.message}` });
  }
});
