import express, { Request, Response } from "express";
export const router = express.Router();

router.get("", (req: Request, res: Response) => {});

router.get("/:id", (req: Request, res: Response) => {});

router.post("", (req: Request, res: Response) => {});

router.put("/:id", (req: Request, res: Response) => {});

router.delete("/:id", (req: Request, res: Response) => {});
