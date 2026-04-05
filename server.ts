import "dotenv/config";
import path, { parse } from "path";
import { Arc } from "./core/app";
import { cookieParser } from "./middlewares/cookieParser";
import { cors } from "./middlewares/cors";
import { jsonParser } from "./middlewares/jsonParser";
import { logger } from "./middlewares/logger";
import { rateLimiter } from "./middlewares/rateLimiter";
import { urlencodedParser } from "./middlewares/urlencodedParser";
import { staticFiles } from "./middlewares/staticFiles";
import { registerUserRoutes } from "./routes/userRoutes";
import cluster from "cluster";
import os from "node:os";

const PORT = parseInt(process.env.PORT || "3000", 10);
const publicPath = path.join(process.cwd(), "public");

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log("-------------------------------------------");
  console.log(`[ARC] Creating ${numCPUs} Workers`);
  console.log("-------------------------------------------");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}

/* const app = new Arc();

app.use(logger);
app.use(cors);
app.use(rateLimiter(100, 60000));
app.use(cookieParser);
app.use(jsonParser);
app.use(urlencodedParser);

const publicPath = path.join(process.cwd(), "public");
app.use(staticFiles(publicPath, "/static"));

registerUserRoutes(app);

const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => {
  console.log("-------------------------------------------");
  console.log(`[ARC] Arc Engine: Operational`);
  console.log(`[ARC] Endpoint:      http://localhost:${PORT}`);
  console.log(`[ARC] Static Root:   ${publicPath}`);
  console.log(`[ARC] Environment:   ${process.env.NODE_ENV || "development"}`);
  console.log("-------------------------------------------");
});

const shutdown = (signal: string) => {
  console.log(`\n[ARC] ${signal} received. Terminating process cleanly.`);
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM")); */
