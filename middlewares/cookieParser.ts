import { Middleware } from "../core/router.js";

export const cookieParser: Middleware = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  req.cookies = {};

  if (!cookieHeader) {
    return next();
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const parts = cookie.split("=");
    const name = parts.shift()?.trim();
    if (name) {
      const value = decodeURI(parts.join("="));
      req.cookies[name] = value;
    }
  }

  next();
};
