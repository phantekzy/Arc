import { Middleware } from "../core/router";

export const jsonParser: Middleware = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") return next();
};
