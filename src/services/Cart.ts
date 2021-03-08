import { Product } from "../Entities/Product.entity";
import { Cart } from "../Entities/Cart.entity";
import { ProductServices } from ".";
import DBConnection from "../db/FilePersistence";
const CartList = new DBConnection("CartList.db");

const getUserCart = async (userId: string): Promise<Cart> => {
  const userCart = await CartList.getById(userId);
  if (!userCart) throw new Error("Cart not found");
  return userCart;
};

export const getAllProducts = async (userId: string): Promise<Product[]> => {
  const userCart = await getUserCart(userId);
  return userCart?.products ? userCart.products : [];
};

export const getProductById = async (
  userId: string,
  productId: string
): Promise<Product[] | []> => {
  const userCart = await CartList.getById(userId);

  const product: Product[] | [] = userCart.products?.filter(
    (p: Product) => p.id === productId
  );

  return product;
};

export const addToCart = async (
  userId: string,
  productId: string
): Promise<Cart> => {
  const userCart = await getUserCart(userId);
  const product = await ProductServices.getById(productId);
  if (!product) throw new Error(`Product not found!`);

  if (!Array.isArray(userCart?.products)) userCart.products = [];

  userCart.timestamp = new Date().toISOString();
  userCart.products.push(product);

  const addProductToCart = await CartList.update(userId, userCart);
  if (!addProductToCart) throw new Error("Can't save cart in DB");

  return userCart;
};

export const deleteFromCart = async (
  userId: string,
  productId: string
): Promise<undefined> => {
  const userCart = await getUserCart(userId);
  const productIndex = userCart?.products?.findIndex((p) => p.id === productId);
  if (productIndex===undefined) throw new Error(`Product not found!`);

  userCart.timestamp = new Date().toISOString();
  userCart.products.splice(productIndex, 1);

  const addProductToCart = await CartList.update(userId, userCart);
  if (!addProductToCart) throw new Error("Can't save cart in DB");

  return;
};
