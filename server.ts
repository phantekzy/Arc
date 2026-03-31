import { Arc } from "./core/app";
import { cookieParser } from "./middlewares/cookieParser";
import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = new Arc();

app.use(logger);
app.use(cors);
app.use(rateLimiter(100, 60000));
app.use(cookieParser);
