import { IMUsers } from "./Users";

export class UserGetDTO {
  email;
  firstname;
  lastname;
  photo;

  constructor(init: IMUsers) {
    this.email = init.email;
    this.firstname = init.firstname;
    this.lastname = init.lastname;
    this.photo = init.photo;
  }
}
