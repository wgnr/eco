"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
__dirname = path_1.default.resolve();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const routers_1 = __importDefault(require("./routers"));
const index_1 = require("./auth/index");
const app = express_1.default();
const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default()); // Reads cookies req.cookies
app.use(express_session_1.default(config_1.sessionConfig));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api", routers_1.default);
app.use("/auth", express_1.default.static(`${__dirname}/public/auth`));
app.use("/", index_1.checkIsAuthenticated, express_1.default.static(`${__dirname}/public`));
// Default redirection...
app.get("*", (req, res) => {
    res.redirect("/");
});
app.use("*", (req, res) => {
    res.status(400).json({
        error: -2,
        description: `Path ${req.originalUrl} is not implemented.`,
    });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app
    .listen(PORT, () => {
    console.log(`✔ Server is running at https://localhost:${PORT}`);
    mongoose_1.default
        .connect("mongodb://localhost/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((r) => console.log(`✔ Connected to DB`))
        .catch((e) => {
        console.error(`❌ Cannot connect to DB... exiting... `);
        console.error(e);
        process.exit();
    });
})
    .on("error", (error) => {
    console.error(`Error in server!!!!!\n${error}`);
    process.exit(1);
});
