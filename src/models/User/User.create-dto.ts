import bCrypt from "bcryptjs";
import { IUsers } from "./Users";

export class UserCreateDTO implements IUsers {
  constructor(
    readonly email: string,
    readonly firstname: string = "",
    readonly lastname: string,
    readonly password: string
  ) {
    this.password = createHash(password);
  }
}

const createHash = (password: string) =>
  bCrypt.hashSync(password, bCrypt.genSaltSync(10));
