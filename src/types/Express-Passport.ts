// github.com/microsoft/TypeScript-Node-Starter/issues/221#issuecomment-525591294
import { IMUsers } from "../models/User/Users";

declare global {
  namespace Express {
    interface User extends IMUsers {}
  }
}
