import { Middleware } from "../core/router";

interface RateRecord {
  count: number;
  resetTime: number;
}

export const rateLimiter = (limit: number, windowMs: number): Middleware => {};
