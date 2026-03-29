import path from "path";
import { Middleware } from "../core/router";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
};

export const staticFiles = (
  rootPath: string,
  prefix: string = "/static",
): Middleware => {
  const absoluteRoot = path.resolve(rootPath);
  return (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }
    const urlPath = req.url?.split("?")[0] || "/";
    if (!urlPath.startsWith(prefix)) {
      return next();
    }
    const relativePath = urlPath.slice(prefix.length);
    const filePath = path.join(absoluteRoot, relativePath);
  };
};
