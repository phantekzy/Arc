import "dotenv/config";
import { Arc } from "./core/app";
import { logger } from "./middlewares/logger";
import { cors } from "./middlewares/cors";
import { jsonParser } from "./middlewares/jsonParser";

const app = new Arc();

app.use(logger);
app.use(cors);
app.use(jsonParser);
