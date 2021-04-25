import { IMUsers } from "./Users";

export class UserGetDTO {
  email;
  firstname;
  lastname;

  constructor(init: IMUsers) {
    this.email = init.email;
    this.firstname = init.firstname;
    this.lastname = init.lastname;
  }
}
