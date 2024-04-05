import { Request, Response, NextFunction } from "express";

const userRequiredMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (request.isAuthenticated() && request.user !== undefined) return next();
  else return response.sendStatus(401);
};

const tokenRequiredMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const supplied = request.header("x-besto-session-token");
  if (!supplied || supplied.length === 0) return response.sendStatus(401);

  const current = request.session?.authToken;
  if (!current) return response.sendStatus(401);

  const isSuppliedTokenMatching = supplied === current;
  if (!isSuppliedTokenMatching) return response.sendStatus(401);

  return next();
};

export { userRequiredMiddleware, tokenRequiredMiddleware };
