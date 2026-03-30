import fs from "fs";
import path from "path";
import { Middleware } from "../core/router";
import { HttpError } from "../core/error";

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

    if (!filePath.startsWith(absoluteRoot)) {
      return next(new HttpError(403, "Forbidden"));
    }
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return next();
      }
    });
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
  };
};
