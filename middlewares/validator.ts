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
    }
  };
};
