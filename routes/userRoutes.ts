import { Arc } from "../core/app";
import { getUser } from "../handlers/userHandler";
import { jwtAuth } from "../middlewares/jwtAuth";

export const registerUserRoutes = (app: Arc) => {
  app.router.get("/users/:id", jwtAuth, getUser);
};
