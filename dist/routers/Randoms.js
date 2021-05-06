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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
exports.router = express_1.default.Router();
exports.router.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cant = Math.abs(Number(req.query.cant)) || 1e8;
    // https://github.com/TypeStrong/ts-node/issues/619#issuecomment-511366883
    const forkProcess = child_process_1.fork(`${__dirname}/../utils/getRandomNumbers`, [], {
        execArgv: ["-r", "ts-node/register"],
    });
    forkProcess.send(cant);
    forkProcess.on("message", (msg) => {
        console.log(msg);
        return res.json({
            msg,
        });
    });
}));
