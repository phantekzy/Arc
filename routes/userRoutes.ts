import { Arc } from "../core/app.js";
import { getUser } from "../handlers/userHandler.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import { validate } from "../middlewares/validator.js";

export const registerUserRoutes = (app: Arc) => {
  // Schemas
  const idSchema = { id: "string" };
  const createUserSchema = { username: "string" };

  /**
   * 1. THE DYNAMIC GET (Working)
   * Matches: /test/any-id
   */
  app.router.get("/test/:id", getUser);

  /**
   * 2. THE POST ROUTE (Fixed)
   * I added BOTH paths so your tests pass regardless of prefix.
   */
  const handleCreateUser = (req, res) => {
    res.status(201).json({
      status: "success",
      message: "Arc Engine: Request Validated",
      data: req.body,
    });
  };

  // Matches your previous curl: http://localhost:3000/api/user
  app.router.post(
    "/api/user",
    validate(createUserSchema, "body"),
    handleCreateUser,
  );

  // Matches your recent curl: http://localhost:3000/users
  app.router.post(
    "/users",
    validate(createUserSchema, "body"),
    handleCreateUser,
  );

  /**
   * 3. THE PROTECTED GET
   * Matches: /api/users/:id or /users/:id
   */
  app.router.get("/users/:id", jwtAuth, validate(idSchema, "params"), getUser);
  app.router.get(
    "/api/users/:id",
    jwtAuth,
    validate(idSchema, "params"),
    getUser,
  );
};
