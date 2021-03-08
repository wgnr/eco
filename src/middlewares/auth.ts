import { Request, Response, NextFunction } from "express";

export const CheckIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = true;

  if (!isAdmin)
    return res.status(403).json({
      error: -1,
      description: `You are not authorized for the path ${req.originalUrl}`,
    });

  return next();
};

export const CheckIsUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isUser = true;

  if (!isUser)
    return res.status(403).json({
      error: -1,
      description: `You are not authorized for the path ${req.originalUrl}`,
    });

  res.locals.userId = "USER-ID";
  if (isUser) return next();
};
