import { IMUsers } from "../models/User/Users";

declare global {
  namespace Express {
    // github.com/microsoft/TypeScript-Node-Starter/issues/221#issuecomment-525591294
    interface User extends IMUsers {}

    // For pino raw
    interface Request {
      raw: { body: object };
    }
  }
}
