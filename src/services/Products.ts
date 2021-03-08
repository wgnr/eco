import { BaseProduct, Product } from "../Entities/Product.entity";
import { v4 as uuidv4 } from "uuid";
import DBConnection from "../db/FilePersistence";
const ProductList = new DBConnection("ProductList.db");

const products = [] as Product[];

export const getAll = async (): Promise<Product[]> => {
  const productList = await ProductList.getAll();
  return productList;
};

export const getById = async (id: string): Promise<Product> => {
  const product: Product = await ProductList.getById(id);

  return product;
};

export const create = async (body: BaseProduct): Promise<Product> => {
  const newProduct: Product = {
    ...body,
    timestamp: new Date().toISOString(),
    id: uuidv4(),
  };

  const createdProduct = await ProductList.add(newProduct);
  if (!createdProduct) throw new Error("Can't save product in DB");

  return createdProduct;
};

export const update = async (
  id: string,
  body: BaseProduct
): Promise<Product | undefined> => {
  return await ProductList.update(id, body);
};

export const deleteById = async (id: string): Promise<undefined> => {
  if (!(await ProductList.delete(id))) throw new Error("Can't delete product");
  return;
};
