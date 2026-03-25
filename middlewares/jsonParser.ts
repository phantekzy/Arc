import { Middleware } from "../core/router";
export const jsonParser: Middleware = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") return next();
  let data = "";
  req.on("data", (c) => (data += c));
  req.on("end", () => {
    try {
      req.body = data ? JSON.parse(data) : {};
      next();
    } catch {
      next(new Error("Invalid JSON"));
    }
  });
};
