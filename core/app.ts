import http from "http";
import { ArcRequest } from "./request";
import { enhanceResponse } from "./response";
import { Router, Middleware } from "./router";
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

    arcReq.params = matched.params;
    const pipeline = [...this.middlewares, ...matched.handlers];

    let i = 0;
    const next = async (err?: any) => {
      if (err)
        return arcRes
          .status(err.statusCode || 500)
          .json({ error: err.message });
      if (i < pipeline.length) await pipeline[i++](arcReq, arcRes, next);
    };
    next();
  }
}
