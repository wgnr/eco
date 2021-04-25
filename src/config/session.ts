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
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: Number(process.env.SESSION_COOKIE_MAXAGE) || 600000,
  },
};
