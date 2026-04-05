import "dotenv/config";
import path from "path";
import cluster from "node:cluster";
import os from "node:os";
import { Arc } from "./core/app";
import { cookieParser } from "./middlewares/cookieParser";
import { cors } from "./middlewares/cors";
import { jsonParser } from "./middlewares/jsonParser";
import { logger } from "./middlewares/logger";
import { rateLimiter } from "./middlewares/rateLimiter";
import { urlencodedParser } from "./middlewares/urlencodedParser";
import { staticFiles } from "./middlewares/staticFiles";
import { registerUserRoutes } from "./routes/userRoutes";

const PORT = parseInt(process.env.PORT || "3000", 10);
const publicPath = path.join(process.cwd(), "public");

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log("-------------------------------------------");
  console.log(`[ARC] Primary Process: Spawning ${numCPUs} Workers`);
  console.log("-------------------------------------------");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`[ARC] Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = new Arc();

  app.use(logger);
  app.use(cors);
  app.use(rateLimiter(100, 60000));
  app.use(cookieParser);
  app.use(jsonParser);
  app.use(urlencodedParser);
  app.use(staticFiles(publicPath, "/static"));

  registerUserRoutes(app);

  app.listen(PORT, () => {
    console.log(
      `[ARC] Worker ${process.pid}: Operational on http://localhost:${PORT}`,
    );
  });
}

const shutdown = (signal: string) => {
  console.log(
    `\n[ARC] ${signal} received. Terminating process ${process.pid} cleanly.`,
  );
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
