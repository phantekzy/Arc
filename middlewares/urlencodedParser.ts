import { Middleware } from "../core/router.js";
import { HttpError } from "../core/error.js";

const MAX_PAYLOAD_SIZE = 1048576;

export const urlencodedParser: Middleware = (req, res, next) => {
  if (req.headers["content-type"] !== "application/x-www-form-urlencoded") {
    return next();
  }

  let body = "";
  let byteCount = 0;

  req.on("data", (chunk: Buffer) => {
    byteCount += chunk.length;
    if (byteCount > MAX_PAYLOAD_SIZE) {
      req.removeAllListeners("data");
      return next(new HttpError(413, "Payload Too Large"));
    }
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const parsedBody: Record<string, string> = {};
      const pairs = body.split("&");

      for (const pair of pairs) {
        if (!pair) continue;
        const [key, value] = pair.split("=");
        if (key) {
          const decodedKey = decodeURIComponent(key.replace(/\+/g, " "));
          const decodedValue = decodeURIComponent(
            (value || "").replace(/\+/g, " "),
          );
          parsedBody[decodedKey] = decodedValue;
        }
      }

      req.body = parsedBody;
      next();
    } catch (err) {
      next(new HttpError(400, "Invalid URL-encoded payload"));
    }
  });
};
