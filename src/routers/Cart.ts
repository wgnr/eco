import express, { Request, Response } from "express";
import { CheckIsAdmin, CheckIsUser } from "../middlewares/auth";
import { CartServices } from "../services/index";
import { Product } from "../Entities/Product.entity";

export const router = express.Router();
router.get(
  "",
  CheckIsAdmin,
  CheckIsUser,
  async (req: Request, res: Response) => {
    try {
      const allProducts: Product[] = await CartServices.getAllProducts(
        res.locals.userId
      );
      return res.json(allProducts);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

router.get(
  "/:id",
  CheckIsAdmin,
  CheckIsUser,
  async (req: Request, res: Response) => {
    const productId: string = req.params.id;

    try {
      const products: Product[] = await CartServices.getProductById(
        res.locals.userId,
        productId
      );

      return !products
        ? res.status(404).send(`Product ${productId} not found in user cart.`)
        : res.json(products);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

router.post(
  "/:id",
  CheckIsAdmin,
  CheckIsUser,
  async (req: Request, res: Response) => {
    const productId: string = req.params.id;

    try {
      const userCart = await CartServices.addToCart(
        res.locals.userId,
        productId
      );

      res.status(201).json(userCart);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router.delete(
  "/:id",
  CheckIsAdmin,
  CheckIsUser,
  async (req: Request, res: Response) => {
    const productId: string = req.params.id;

    try {
      await CartServices.deleteFromCart(res.locals.userId, productId);
      return res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
