import { Arc } from "./core/app";
import { cookieParser } from "./middlewares/cookieParser";
import { cors } from "./middlewares/cors";
import { jsonParser } from "./middlewares/jsonParser";
import { logger } from "./middlewares/logger";
import { rateLimiter } from "./middlewares/rateLimiter";
import { urlencodedParser } from "./middlewares/urlencodedParser";

const app = new Arc();

app.use(logger);
app.use(cors);
app.use(rateLimiter(100, 60000));
app.use(cookieParser);
app.use(jsonParser);
app.use(urlencodedParser);
