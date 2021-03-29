import { BaseProduct, Product } from "../Entities/Product.entity";
import { v4 as uuidv4 } from "uuid";

import { IProduct, Product as ProductModel } from "../models/Product";
const hiddenFields = { _id: 0, __v: 0 };

export const getAll = async (): Promise<Product[]> => {
  const products: Array<IProduct> = await ProductModel.find({}, hiddenFields);
  return products;
};

export const getById = async (id: string): Promise<Product | null> => {
  const product: IProduct | null = await ProductModel.findOne(
    { id },
    hiddenFields
  );
  return product;
};

export const create = async (body: BaseProduct): Promise<Product> => {
  const newProduct: Product = {
    ...body,
    timestamp: new Date().toISOString(),
    id: uuidv4(),
  };

  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

export const update = async (
  id: string,
  body: BaseProduct
): Promise<Product | null> => {
  return await ProductModel.findOneAndUpdate({ id }, { $set: { ...body } });
};

export const deleteById = async (id: string): Promise<undefined> => {
  await ProductModel.findOneAndDelete({ id });
  return;
};
