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

  listen(port: number, cb?: () => void) {
    const server = http.createServer((req, res) => this.handle(req, res));
    server.listen(port, cb);
  }

  private async handle(req: http.IncomingMessage, res: http.ServerResponse) {}
}
