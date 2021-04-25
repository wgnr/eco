import { model, Schema, Model, Document } from "mongoose";

const UsersCollection = "users";

export interface IUsers {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
}

export interface IMUsers extends Document, IUsers {}

const UsersSchema: Schema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

export const User: Model<IMUsers> = model(UsersCollection, UsersSchema);
