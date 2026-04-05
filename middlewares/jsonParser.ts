import { Middleware } from "../core/router.js";

export const jsonParser: Middleware = (req, res, next) => {
  const MAX_SIZE = 1 * 1024 * 1024;
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);

  if (contentLength > MAX_SIZE) {
    return res.status(413).json({ error: "Payload Too Large" });
  }

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
    if (data.length > MAX_SIZE) {
      req.destroy();
    }
  });

  req.on("end", () => {
    try {
      if (data) req.body = JSON.parse(data);
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid JSON format" });
    }
  });
};
