export interface BaseProduct {
  code: string;
  description: string;
  name: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface Product extends BaseProduct {
  timestamp: string;
  id: string;
}
