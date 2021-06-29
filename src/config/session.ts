import { GlobalVars } from "../config"
import { SessionOptions } from "express-session";
import connectRedis from "connect-redis";
import MongoStore from "connect-mongo";
import session from "express-session";
import redis from "redis";
import { logger } from "../utils/logger";

const { db: { MONGODB_URI },
  session: { SESSION_SECRET, SESSION_COOKIE_MAXAGE } } = GlobalVars

// const redisClient = redis.createClient();
// redisClient.on("error", function (error) {
//   logger.logger.error({ error });
// });
// const RedisStorage = connectRedis(session);

// export const sessionConfig: SessionOptions = {
//   store: new RedisStorage({
//     host: "localhost",
//     port: 6379,
//     client: redisClient,
//     ttl: 300,
//   }),
//   secret: SESSION_SECRET || "my-super-secrettASKLOjufdlaksjdklsaj",
//   resave: true,
//   saveUninitialized: false,
//   rolling: true,
//   cookie: {
//     httpOnly: false,
//     secure: false,
//     maxAge: Number(SESSION_COOKIE_MAXAGE) || 600000,
//   },
// };

export const sessionConfig: SessionOptions = {
  store: MongoStore.create({
    mongoUrl: MONGODB_URI!,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: SESSION_SECRET || "my-super-secrettASKLOjufdlaksjdklsaj",
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: Number(SESSION_COOKIE_MAXAGE) || 600000,
  },
};
