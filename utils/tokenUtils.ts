const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "FATAL: JWT_SECRET is not defined in production environment.",
    );
  } else {
    console.warn("WARNING: JWT_SECRET is missing. Using insecure dev fallback");
  }

  const FINAL_SECRET = SECRET;

  export class TokenUtils {}
}
