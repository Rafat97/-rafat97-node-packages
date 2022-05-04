import { ExpressApplication, IOptions, ViewEngine } from "../../src/index";
import routerAPI from "./routes/api";
import { routerTest } from "./routes/test";

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
  ExpressApplication.Logger(config.logDir).error(err);

  console.log(err.message);
  res.status(500).json(error);
};

const demoRouterNotFound = function (req: any, res: any, next: any) {
  res.status(404);

  console.log("Not found");
  res.json({ error: "Not found" });
};

const config: IOptions = {
  appName: "Example Application",
  appSecret: "TestSecret1234",
  logDir: `${__dirname}/extra/logs/`,
  viewDir: `${__dirname}/views/`,
  viewEngine: ViewEngine.HBS,
  staticContentDir: `${__dirname}/public/`,
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

const expressApp = new ExpressApplication(config)
  .addMultipleMiddleware(mid1, mid2, mid1)
  .addCookieParser()
  .addResponseTime()
  // .addServerFavicon()
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
  .addErrorHandler(demoErrorHandler)
  .addMiddleware(demoRouterNotFound)
  .startServerSync(3000);

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
