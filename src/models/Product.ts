import { model, Schema, Model, Document } from "mongoose";

const ProductsCollection = "productos";

export interface IProduct extends Document {
  code: string;
  description: string;
  id: string;
  name: string;
  price: number;
  stock: number;
  thumbnail: string;
  timestamp: string;
}

const ProdcutSchema: Schema = new Schema({
  id: { type: String, require: true },
  code: { type: String, require: true },
  description: { type: String, require: true },
  name: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  thumbnail: { type: String, require: true },
  timestamp: { type: String, require: true },
});

export const Product: Model<IProduct> = model(
  ProductsCollection,
  ProdcutSchema
);
