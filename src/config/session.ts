import { SessionOptions } from "express-session";
import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import { logger } from "../utils/logger";

const redisClient = redis.createClient();
redisClient.on("error", function (error) {
  logger.logger.error({ error });
});
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
