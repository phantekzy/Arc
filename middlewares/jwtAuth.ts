import jwt from "jsonwebtoken";
import { Middleware } from "../core/router";
import { HttpError } from "../core/error";

export const jwtAuth: Middleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpError(401, "Unauthorized"));
  try {
    req.user = jwt.verify(token, "SECRET_KEY");
    next();
  } catch {
    next(new HttpError(403, "Invalid Token"));
  }
};
