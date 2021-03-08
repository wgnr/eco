import { Product } from "./Product.entity";

export interface CartAddProduct {
  product: Product;
}

export interface BaseCart {
  products: Product[];
}

export interface Cart extends BaseCart {
  timestamp: string;
  id: string;
}
