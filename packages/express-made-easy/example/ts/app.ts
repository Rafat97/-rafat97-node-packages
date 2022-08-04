import {
  IWinstonLoggerOptions,
  WinstonLogger,
} from "./../../src/express/utils/WLogger";
console.log(process.env);
import { ExpressApplication, IOptions, ViewEngine } from "../../src/index";
import routerAPI from "./routes/api";
import routerErr from "./routes/err";
import { routerTest } from "./routes/test";
import expressWinston, { LoggerOptions } from "express-winston";

const mid1 = function (req: any, res: any, next: any) {
  console.log("mid1");
  next();
};

const mid2 = function (req: any, res: any, next: any) {
  console.log("mid2");
  next();
};

const demoGet = (req: any, res: any, next: any) => {
  // ExpressApplication.Logger(config.logDir).error("Test Error in /");
  // throw new Error("Test Error in /");
  var randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie("cookieName", randomNumber, {
    maxAge: 900000,
    // httpOnly: true,
    domain: ".rafat.com",
    path: "/",
  });
  res.json({ message: "Hello world" });
};

const demoErrorHandler = (err: any, req: any, res: any, next: any) => {
  const error = {
    message: err.message,
    stack: err.stack,
  };
  // ExpressApplication.Logger(config.log?.dir).error(err);
  console.error(err);
  console.error(err.message);
  res.status(500).json(error);
};

const demoRouterNotFound = function (req: any, res: any, next: any) {
  res.status(404);
  console.error("demoRouterNotFound: Not found");
  res.json({ error: "Not found" });
};

const config: IOptions = {
  appName: "Example Application",
  appHost: "127.0.0.1",
  appPort: 3000,
  appSecret: "TestSecret1234",
  log: { dir: `${__dirname}/extra/logs/` },
  view: { dir: `${__dirname}/views/`, engine: ViewEngine.HBS },
  staticContentDir: `${__dirname}/public/`,
  fabIconPath: `${__dirname}/public/images/favicon.png`,
  helmet: {
    contentSecurityPolicy: false,
  },
  rateLimiter: {
    // windowMs: 15 * 60 * 1000, // 15 minutes
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: JSON.stringify({ message: "Too Many Request" }),
  },
  session: {
    secret: "TestSecret1234",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  },
  csrf: { cookie: true },
};

const loggerOption: IWinstonLoggerOptions = {
  appName: config.appName,
  isEnablePrintRestOfTheObject: true,
};

const expressWinstonOptions: LoggerOptions = {
  winstonInstance: new WinstonLogger(loggerOption).overrideConsoleLogger(),
  level: function (req: any, res: any) {
    var level = "";
    if (res.statusCode >= 100) {
      level = "info";
    }
    if (res.statusCode >= 400) {
      level = "warn";
    }
    if (res.statusCode >= 500) {
      level = "error";
    }
    if (res.statusCode == 401 || res.statusCode == 403) {
      level = "critical";
    }
    return level;
  },
  ignoreRoute: function (req: any, res: any) {
    if (req.url === "/v1/health") {
      return true;
    }
    return false;
  },
};

const expressApp = new ExpressApplication(config)
  .addMiddleware(expressWinston.logger(expressWinstonOptions))
  .addRequestID()
  .addMorgan()
  .addMultipleMiddleware(mid1, mid2, mid1)
  .addCookieParser()
  .addResponseTime()
  .addServerFavicon()
  .addMethodOverwriteHeader()
  .addFileUpload()
  .addRateLimiter()
  .addView()
  .addStaticContent()
  .addJSONParser()
  .addCompression()
  .addHelmet()
  .addCsrf()
  .addCors()
  .getMethod("/", demoGet)
  .router("/api", routerAPI)
  .router("/test", routerTest)
  .router("/err", routerErr)
  .addErrorHandler(demoErrorHandler)
  .addMiddleware(demoRouterNotFound)
  .startServerSync();

// default express
// import express from "express";

// const routerA = express.Router();
// routerA.use((req: any, res: any, next: any) => {
//   console.log("Middleware A");
//   next();
// });
// routerA.get("/", (req, res, next) => {
//   res.send("Hello World! RouterA");
// });

// const routerB = express.Router().get("/", (req, res, next) => {
//   res.send("Hello World! routerB");
// });

// const routerC = express.Router().get("/", (req, res, next) => {
//   res.send("Hello World! routerC");
// });

// const app = express();

// app.use("/", routerA);
// app.use("/test", routerB);
// app.use("/test", routerC);
// app.listen(process.env.PORT || 3000, () => {
//   console.log("Server listening on port 8000");
// });
