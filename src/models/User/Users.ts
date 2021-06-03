import { model, Schema, Model, Document } from "mongoose";

const UsersCollection = "users";

export interface IUsers {
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  photo?: string;
  social?: {
    facebook?: {
      email?: string;
      username?: string;
    };
  };
}

export interface IMUsers extends Document, IUsers {}

const UsersSchema: Schema = new Schema({
  email: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  photo: { type: String },
  social: { type: Object },
});

export const User: Model<IMUsers> = model(UsersCollection, UsersSchema);
