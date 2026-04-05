import { ArcRequest } from "./request.js";
import { ArcResponse } from "./response.js";

export type Middleware = (
  req: ArcRequest,
  res: ArcResponse,
  next: (err?: any) => void,
) => void | Promise<void>;

interface Route {
  method: string;
  pattern: RegExp;
  keys: string[];
  handlers: Middleware[];
}

export class Router {
  private routes: Route[] = [];

  private add(method: string, path: string, handlers: Middleware[]) {
    const keys: string[] = [];

    const patternString = path.replace(/:(\w+)/g, (_, name) => {
      keys.push(name);
      return "([^/]+)";
    });

    const pattern = new RegExp(`^${patternString}/?$`);

    this.routes.push({ method, pattern, keys, handlers });
  }

  get(path: string, ...h: Middleware[]) {
    this.add("GET", path, h);
  }

  post(path: string, ...h: Middleware[]) {
    this.add("POST", path, h);
  }

  put(path: string, ...h: Middleware[]) {
    this.add("PUT", path, h);
  }

  delete(path: string, ...h: Middleware[]) {
    this.add("DELETE", path, h);
  }

  match(method: string, path: string) {
    for (const r of this.routes) {
      if (r.method !== method) continue;

      const m = path.match(r.pattern);
      if (m) {
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
