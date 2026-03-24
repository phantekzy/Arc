import http from "http";
import { Middleware, Router } from "./router";
import { ArcRequest } from "./request";
import { enhanceResponse } from "./response";
import { parseQuery } from "./utils";

export class Arc {
  public router = new Router();
  private middlewares: Middleware[] = [];
  use(m: Middleware) {
    this.middlewares.push(m);
  }
  listen(port: number, cb: () => void) {
    http.createServer((req, res) => this.handle(req, res)).listen(port, cb);
  }
  private async handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const arcReq = req as ArcRequest;
    const arcRes = enhanceResponse(res);
    const { path, query } = parseQuery(req.url || "/");
    arcReq.query = query;
    const matched = this.router.match(req.method || "GET", path);
    if (!matched) return arcRes.status(404).json({ error: "Not Found" });
  }
}
