import { Middleware } from "../core/router";

interface RateRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateRecord>();

export const rateLimiter = (limit: number, windowMs: number): Middleware => {
  return (req, res, next) => {
    const ip = req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const record = store.get(ip);
  };
};
