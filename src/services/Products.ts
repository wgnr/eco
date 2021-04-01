import { BaseProduct, Product } from "../Entities/Product.entity";
import { v4 as uuidv4 } from "uuid";

import { IProduct, Product as ProductModel } from "../models/Product";
const hiddenFields = { _id: 0, __v: 0 };

export const getAll = async (filters?: Filters): Promise<Product[]> => {
  const products: Array<IProduct> = await ProductModel.find(
    { ...mapFiltersToMongo(filters) },
    hiddenFields
  );
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

function mapFiltersToMongo(filters: Filters | undefined): object {
  if (!filters) return {};

  let mongoQuery = {};

  for (let [k, v] of Object.entries(filters)) {
    if (k === "name") mongoQuery = { ...mongoQuery, [k]: v };
    else if (k === "code") mongoQuery = { ...mongoQuery, [k]: v };
    else if (["price", "stock"].includes(k))
      mongoQuery = {
        ...mongoQuery,
        ...(Object.keys(v).includes("eq")
          ? { [k]: { $eq: v.eq } }
          : {
              $and: Object.entries(v).reduce((numberQuery: Object[], curr) => {
                return ["gt", "gte", "lt", "lte"].includes(curr[0])
                  ? [...numberQuery, { [k]: { ["$" + curr[0]]: curr[1] } }]
                  : numberQuery;
              }, []),
            }),
      };
  }

  return mongoQuery;
}
export interface Filters {
  name?: String;
  code?: String;
  price?: NumberFiltering;
  stock?: NumberFiltering;
}

interface NumberFiltering {
  gt?: Number;
  gte?: Number;
  lt?: Number;
  lte?: Number;
  eq?: Number;
}
