"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDTO = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserCreateDTO {
    constructor(email, firstname = "", lastname, password) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.password = createHash(password);
    }
}
exports.UserCreateDTO = UserCreateDTO;
const createHash = (password) => bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
