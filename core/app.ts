import http from "http";
import { ArcRequest } from "./request.js";
import { ArcResponse, enhanceResponse } from "./response.js";
import { Router, Middleware } from "./router.js";
import { parseQuery } from "./utils.js";
import { HttpError } from "./error.js";

export class Arc {
  public router = new Router();
  private middlewares: Middleware[] = [];

  public get = this.router.get.bind(this.router);
  public post = this.router.post.bind(this.router);
  public put = this.router.put.bind(this.router);
  public delete = this.router.delete.bind(this.router);

  use(m: Middleware) {
    this.middlewares.push(m);
  }

  listen(port: number, cb?: () => void) {
    const server = http.createServer((req, res) => this.handle(req, res));
    server.listen(port, cb);
  }

  private async handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const arcReq = req as ArcRequest;
    const arcRes = enhanceResponse(res);
    const { path, query } = parseQuery(req.url || "/");

    arcReq.query = query;
    arcReq.params = {};

    const matched = this.router.match(req.method || "GET", path);

    const pipeline = [...this.middlewares];

    if (matched) {
      arcReq.params = matched.params;
      pipeline.push(...matched.handlers);
    } else {
      pipeline.push((_req, res) => {
        if (!res.headersSent) {
          res.status(404).json({ error: "Not Found" });
        }
      });
    }

    let index = 0;

    const next = async (err?: any) => {
      if (arcRes.headersSent) return;

      if (err) {
        const status = err instanceof HttpError ? err.statusCode : 500;
        return arcRes
          .status(status)
          .json({ error: err.message || "Internal Server Error" });
      }

      if (index < pipeline.length) {
        try {
          const mw = pipeline[index++];
          await mw(arcReq, arcRes, next);
        } catch (error) {
          await next(error);
        }
      }
    };

    await next();
  }
}
