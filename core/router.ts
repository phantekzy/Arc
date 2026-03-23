import { ArcRequest } from "./request";
import { ArcResponse } from "./response";

export type Middleware = (
  req: ArcRequest,
  res: ArcResponse,
  next: (err?: any) => void,
) => void | Promise<void>;

export class Router {
  private routes: Array<{
    method: string;
    pattern: RegExp;
    keys: string[];
    handlers: Middleware[];
  }> = [];

  private add(method: string, path: string, handlers: Middleware[]) {
    const keys: string[] = [];
    const pattern = new RegExp(
      "^" +
        path.replace(/:([^/]+)/g, (_, name) => {
          keys.push(name);
          return "([^/]+)";
        }) +
        "$",
    );
    this.routes.push({ method, pattern, keys, handlers });
  }
}
