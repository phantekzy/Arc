import { ArcRequest } from "../core/request";
import { ArcResponse } from "../core/response";

export const getUser = (req: ArcRequest, res: ArcResponse) => {
  res.json({ id: req.params?.id, user: req.user });
};
