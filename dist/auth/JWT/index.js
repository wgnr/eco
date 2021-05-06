"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET || "asdwqsddcvdf";
const Auth_1 = require("../../routers/Auth");
const Users_1 = require("../../models/User/Users");
const User_create_dto_1 = require("../../models/User/User.create-dto");
const User_get_dto_1 = require("../../models/User/User.get-dto");
const generateToken = (user) => jsonwebtoken_1.default.sign({ data: user }, tokenSecret, { expiresIn: "1s" });
const generateTokenResponser = (user) => ({
    token: generateToken(new User_get_dto_1.UserGetDTO(user)),
});
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization)
        return res.status(400).json({ message: "Need authorization" });
    const [type, token] = req.headers.authorization.split(" ");
    if (type !== "Bearer")
        return res.status(403).json({ message: "Invalid method" });
    if (!token)
        return res.status(403).json({ message: "Insert token" });
    jsonwebtoken_1.default.verify(token, tokenSecret, (err, decoded) => {
        if (err)
            return res
                .status(500)
                .json({ message: "failed to authenticate token", err });
        if (!decoded)
            return res.status(500).json({ message: "no data decoded" });
        // @ts-ignore
        res.locals.user = decoded === null || decoded === void 0 ? void 0 : decoded.data;
        next();
    });
});
exports.verify = verify;
Auth_1.router.get("/testJWT", exports.verify, (req, res) => {
    res.json({ message: "ok", data: res.locals.user });
});
Auth_1.router.post("/registerJWT", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname } = req.body;
    try {
        const user = yield Users_1.User.findOne({ email });
        console.log(user);
        if (user)
            return res.status(409).json({ message: "Already exitst" });
        const newUser = new Users_1.User(new User_create_dto_1.UserCreateDTO(email, firstname, lastname, password));
        newUser.save((err, savedUser) => {
            if (err) {
                console.log(`error in saving email ${email}`);
                throw err;
            }
            res.status(200).json(generateTokenResponser(savedUser));
        });
    }
    catch (e) {
        res.json({ error: `${e.message}` });
    }
}));
Auth_1.router.post("/loginJWT", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Users_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (!user.password)
            return res.status(400).json({ message: "Used social media to login" });
        if (!bcryptjs_1.default.compareSync(password, user.password))
            return res.status(400).json({ message: "Wrong pass" });
        return res.status(200).json(generateTokenResponser(user));
    }
    catch (e) {
        res.json({ error: `${e.message}` });
    }
}));
