import { Arc } from "../core/app.js";
import { getUser } from "../handlers/userHandler.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import { validate } from "../middlewares/validator.js";

export const registerUserRoutes = (app: Arc) => {
  const idSchema = { id: "string" };

  app.router.get("/test/:id", getUser);

  app.router.get("/users/:id", jwtAuth, validate(idSchema, "params"), getUser);
};
