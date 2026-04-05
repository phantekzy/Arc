import { Middleware } from "../core/router.js";

export const validate = (
  schema: Record<string, string>,
  source: "body" | "params" = "body",
): Middleware => {
  return (req, res, next) => {
    const data = source === "params" ? req.params : req.body;

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return res.status(400).json({
        error: "Validation Failed",
        message: `A valid ${source} object is required.`,
      });
    }

    const errors: string[] = [];

    for (const [key, expectedType] of Object.entries(schema)) {
      if (!(key in data)) {
        errors.push(`Field '${key}' is missing in ${source}`);
        continue;
      }

      const actualType = typeof data[key];
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
