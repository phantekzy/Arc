import { ArcRequest } from "./request";
import { ArcResponse } from "./response";

export type Middleware = (
  req: ArcRequest,
  res: ArcResponse,
  next: (err?: any) => void,
) => void | Promise<void>;

export class Router {}
