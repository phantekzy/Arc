import { Middleware, Router } from "./router";

export class Arc {
  public router = new Router();
  private middlewares: Middleware[] = [];
  use(m: Middleware) {
    this.middlewares.push(m);
  }
}
