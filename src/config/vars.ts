import { config } from "dotenv";
import { existsSync } from 'fs'
import { resolve } from "path"
import minimist from "minimist"
import { DBConnections } from "../db/DBFactory"

const IS_PROD = process.env.NODE_ENV === "production"
const envPath = resolve(process.cwd(), `.env.${IS_PROD ? "production" : "development"}`)
// if .env.development | .env.production isn't available, load regular .env
config(existsSync(envPath) ? { path: envPath } : {});

const varsFromCLI = minimist(process.argv.slice(2))

const getDBSourcer = (connection: string) => Object.values(DBConnections).includes(connection as DBConnections) ? connection : DBConnections.DEFAULT;

export default {
  IS_PROD,
  server: {
    MODE_SERVER: varsFromCLI.mode || process.env.MODE_SERVER || "FORK",
    PORT: Number(varsFromCLI.port) || Number(process.env.PORT) || 3000,
    DISABLE_CHILD_PROCESS: varsFromCLI["disable-child-process"] || process.env.DISABLE_CHILD_PROCESS || false,
  },
  logging: {
    PREVENT_CONSOLE_LOGGER: varsFromCLI["prevent-console-logger"] || process.env.PREVENT_CONSOLE_LOGGER || false,
    ADD_CONSOLELOG_INFO: varsFromCLI["add-consolelog-info"] || process.env.ADD_CONSOLELOG_INFO || false,
  },
  db: {
    DB_STORAGE: getDBSourcer((varsFromCLI.db || process.env.DB_STORAGE) as string),
    MONGODB_URI: process.env.MONGODB_URI || ""
  },
  session: {
    SESSION_SECRET: process.env.SESSION_SECRET || "lkjasdjlskaj",
    SESSION_COOKIE_MAXAGE: process.env.SESSION_COOKIE_MAXAGE || 30000,
  },
  auth: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "as asdss da",
    socials: {
      facebook: {
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
      },
    },
  },
  notifications: {
    email: {
      ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
      ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
      gmail: {
        MAIL_USERNAME: process.env.MAIL_USERNAME,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD,
        OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
        OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
        OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
      }
    },
    sms: {
      SMS_ADMIN_ALERT: process.env.SMS_ADMIN_ALERT,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    }
  }
}