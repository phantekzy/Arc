import { Middleware } from "../core/router";

export const cookieParser: Middleware = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  req.cookies = {};

  if (!cookieHeader) return next();
  const cookies = cookieHeader.split(";");
};
