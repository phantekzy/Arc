import "dotenv/config";
import { Arc } from "./core/app";
import { logger } from "./middlewares/logger";
import { cors } from "./middlewares/cors";
import { jsonParser } from "./middlewares/jsonParser";
import { registerUserRoutes } from "./routes/userRoutes";

const app = new Arc();

app.use(logger);
app.use(cors);
app.use(jsonParser);

registerUserRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), () => {
  console.log(`Arc Engine running on http://localhost:${PORT}`);
});
