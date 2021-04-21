import { SessionOptions } from "express-session";
import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";

const redisClient = redis.createClient();
const RedisStorage = connectRedis(session);

export const sessionConfig: SessionOptions = {
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