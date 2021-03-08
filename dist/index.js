"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const app = express_1.default();
const PORT = process.env.port || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routers_1.default);
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
    console.log(`Server is running at https://localhost:${PORT}`);
})
    .on("error", (error) => console.error(`Error in server!!!!!\n${error}`));
