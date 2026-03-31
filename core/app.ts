import http from "http";
import { ArcRequest } from "./request";
import { ArcResponse, enhanceResponse } from "./response";
import { Router, Middleware } from "./router";
import { parseQuery } from "./utils";
import { HttpError } from "./error";

export class Arc {
  public router = new Router();
  private middlewares: Middleware[] = [];

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

    if (matched) {
      arcReq.params = matched.params;
    }

    const notFoundHandler: Middleware = (req, res) => {
      if (!res.headersSent) {
        res.status(404).json({ error: "Not Found" });
      }
    };

    const routeHandlers = matched ? matched.handlers : [notFoundHandler];
    const pipeline = [...this.middlewares, ...routeHandlers];

    let index = 0;

    const next = async (err?: any) => {
      if (err) {
        if (!arcRes.headersSent) {
          const status = err instanceof HttpError ? err.statusCode : 500;
          arcRes
            .status(status)
            .json({ error: err.message || "Internal Server Error" });
        }
        return;
      }

      if (index < pipeline.length) {
        try {
          const mw = pipeline[index++];
          await mw(arcReq, arcRes, next);
        } catch (error) {
          next(error);
        }
      } else if (!matched && !arcRes.headersSent) {
        arcRes.status(404).json({ error: "Not Found" });
      }
    };

    await next();
  }
}
