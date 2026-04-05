import { Arc } from "../core/app.js";
import { getUser } from "../handlers/userHandler.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import { validate } from "../middlewares/validator.js";
import { ArcRequest } from "../core/request.js";
import { ArcResponse } from "../core/response.js";

export const registerUserRoutes = (app: Arc) => {
  const idSchema = { id: "string" };
  const createUserSchema = { username: "string" };

  app.router.get("/test/:id", getUser);

  const handleCreateUser = (req: ArcRequest, res: ArcResponse) => {
    res.status(201).json({
      status: "success",
      message: "Arc Engine: Request Validated",
      data: req.body,
    });
  };

  app.router.post(
    "/api/user",
    validate(createUserSchema, "body"),
    handleCreateUser,
  );

  app.router.post(
    "/users",
    validate(createUserSchema, "body"),
    handleCreateUser,
  );

  app.router.get("/users/:id", jwtAuth, validate(idSchema, "params"), getUser);
  app.router.get(
    "/api/users/:id",
    jwtAuth,
    validate(idSchema, "params"),
    getUser,
  );
};
