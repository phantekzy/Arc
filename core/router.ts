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

  get(path: string, ...h: Middleware[]) {
    this.add("GET", path, h);
  }
  post(path: string, ...h: Middleware[]) {
    this.add("POST", path, h);
  }

  match(method: string, path: string) {
    for (const r of this.routes) {
      const m = path.match(r.pattern);
      if (m && r.method === method) {
        const params = r.keys.reduce(
          (acc, key, i) => ({ ...acc, [key]: m[i + 1] }),
          {},
        );
        return { handlers: r.handlers, params };
      }
    }
    return null;
  }
}
