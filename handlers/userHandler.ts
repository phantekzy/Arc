import { ArcRequest } from "../core/request.js";
import { ArcResponse } from "../core/response.js";

export const getUser = (req: ArcRequest, res: ArcResponse) => {
  res.json({ id: req.params?.id, user: req.user });
};
