import { Middleware } from "../src";

export const validate = (schema: Record<string, string>): Middleware => {
  return (req, res, next) => {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        error: "Validation Failed",
        message: "A valid JSON object is required.",
      });
    }
    const errors: string[] = [];
    for (const [key, expectedType] of Object.entries(schema)) {
      if (!(key in body)) {
        errors.push(`Field '${key}' is missing`);
        continue;
      }
      const actualType = typeof body[key];
      if (actualType !== expectedType) {
        errors.push(
          `Field '${key}' expected ${expectedType}, got ${actualType}`,
        );
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }
    next();
  };
};
