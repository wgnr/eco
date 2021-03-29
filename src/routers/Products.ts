import express, { Request, Response } from "express";
import { CheckIsAdmin, CheckIsUser } from "../middlewares/auth";
import { ProductServices } from "../services/index";
import { BaseProduct, Product } from "../Entities/Product.entity";

export const router = express.Router();

router.get(
  "",
  CheckIsUser,
  CheckIsAdmin,
  async (req: Request, res: Response) => {
    try {
      const allProducts: Product[] = await ProductServices.getAll();
      return res.json(allProducts);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

router.get(
  "/:id",
  CheckIsUser,
  CheckIsAdmin,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      const product: Product | null = await ProductServices.getById(id);

      return product
        ? res.json(product)
        : res.status(404).send(`Product ${id} not found.`);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

router.post("", CheckIsAdmin, async (req: Request, res: Response) => {
  const newProductInfo: BaseProduct = req.body;

  try {
    const newProduct = await ProductServices.create(newProductInfo);

    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", CheckIsAdmin, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const productUpdate: BaseProduct = req.body;

  try {
    const updatedProduct = await ProductServices.update(id, productUpdate);
    if (!updatedProduct) {
      return res.status(404).send(`Product ${id} not found.`);
    }
    return res.json(updatedProduct);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/:id", CheckIsAdmin, async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    await ProductServices.deleteById(id);
    return res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
