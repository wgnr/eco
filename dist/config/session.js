"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const redisClient = redis_1.default.createClient();
const RedisStorage = connect_redis_1.default(express_session_1.default);
exports.sessionConfig = {
    store: new RedisStorage({
        host: "localhost",
        port: 6379,
        client: redisClient,
        ttl: 300,
    }),
    secret: process.env.SESSION_SECRET || "my-super-secrettASKLOjufdlaksjdklsaj",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: Number(process.env.SESSION_COOKIE_MAXAGE) || 60 },
};
// import session from 'express-session';
// declare module 'express-session' {
//   export interface SessionData {
//     user: { [key: string]: any };
//   }
// }
