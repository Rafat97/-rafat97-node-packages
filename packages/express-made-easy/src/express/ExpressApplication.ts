import express, { Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IMethods } from "./IMethods";
import { ExpressApplicationRouter } from "./ExpressApplicationRouter";
import debug from "debug";
import appRoot from "app-root-path";
import { morganMiddleware } from "./logger";
import { winstonLogger } from "./logger";
import csurf, { CookieOptions as CsurfCookieOptions } from "csurf";
import figlet from "figlet";
import cookieParser from "cookie-parser";
import updateNotifier from "update-notifier";
import favicon from "serve-favicon";
import helmet, { HelmetOptions } from "helmet";
import methodOverride from "method-override";
import expressFileUpload from "express-fileupload";
import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";
import cors from "cors";
import session, {
  SessionOptions as ExpressSessionOptions,
} from "express-session";
import compression from "compression";
import responseTime from "response-time";
// https://gist.github.com/rtgibbons/7354879

/**
 *
 * @enum ViewEngine
 *
 * Supported View Engine
 */
export enum ViewEngine {
  HBS = "hbs",
  PUG = "pug",
  EJS = "ejs",
  JADE = "jade",
}

/**
 *
 * @interface IOptions
 *
 * Application Information options
 *
 */
export interface IOptions {
  appName?: string;
  appHost?: string;
  appPort?: number;
  appSecret?: string;
  logDir?: string;
  viewDir?: string;
  viewEngine?: string;
  staticContentDir?: string;
  fabIconPath?: string;
  rateLimiter?: object | undefined;
  session?: ExpressSessionOptions;
  compression?: compression.CompressionOptions;
  helmet?: HelmetOptions;
  csrf?: {
    value?: ((req: express.Request) => string) | undefined;
    cookie?: csurf.CookieOptions | boolean | undefined;
    ignoreMethods?: string[] | undefined;
    sessionKey?: string | undefined;
  };
}

/**
 *
 * @class ExpressApplication
 * @implements IMethods
 *
 * @description Application builder class
 * This class accept constructor with some options.
 * This Option is a type of `IOptions`. When we call this class
 * it will create a `express()` app
 *
 */
export class ExpressApplication implements IMethods {
  private application: Express;
  private options: IOptions;
  private debugger: debug.IDebugger;
  private appPath = appRoot; // get application root path

  public constructor(options?: IOptions) {
    this.application = express();
    this.options = options || {};
    this.debugger = debug(`${this.options.appName || "ExpressApplication"}`);

    // default support
    this.addLogger();

    Object.setPrototypeOf(this, ExpressApplication.prototype);
  }

  /**
   * This method is used for the added logging feature
   *
   * @returns ExpressApplication
   */
  private addLogger() {
    const logDir = this.options.logDir || `${this.appPath}/logs/`;
    this.addMiddleware(morganMiddleware(logDir));
    return this;
  }

  /**
   * Get the express application
   * @returns Express
   */
  public getApplication(): Express {
    return this.application;
  }

  /**
   * Handling the `option` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public optionsMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.options(path, handlers);
    return this;
  };

  /**
   * Handling the `put` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public putMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.get(path, handlers);
    return this;
  };

  /**
   * Handling the `get` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public getMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.get(path, handlers);
    return this;
  };

  /**
   * Handling the `post` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public postMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.post(path, handlers);
    return this;
  };

  /**
   * Handling the `delete` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public deleteMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.delete(path, handlers);
    return this;
  };

  /**
   * Handling the `patch` method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public patchMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.patch(path, handlers);
    return this;
  };

  /**
   * Handling the `all` types method
   *
   * @param path url path
   * @param handlers callback functions
   * @returns ExpressApplication
   */
  public allMethod = (
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this => {
    this.application.all(path, handlers);
    return this;
  };

  /**
   *
   * Add a middleware into an express application
   *
   * @param handler middleware function
   * @returns ExpressApplication
   */
  public addMiddleware(
    handler: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => void
  ) {
    this.application.use(handler);
    return this;
  }

  /**
   *
   * You can handle multiple middleware
   *
   * @param handlers multiple middleware function
   * @returns ExpressApplication
   */
  public addMultipleMiddleware = (
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ) => {
    for (const handlerMiddleware of handlers) {
      this.application.use(handlerMiddleware);
    }
    return this;
  };

  /**
   *
   * This method is use to add router. You can create router using
   * `ExpressApplicationRouter` router class
   *
   * @param path router root path
   * @param router  ExpressApplicationRouter
   * @returns  ExpressApplication
   */
  public router = (path: string = "", router: ExpressApplicationRouter) => {
    if (path == "") {
      this.application.use(router.getRouter());
    } else {
      this.application.use(path, router.getRouter());
    }
    return this;
  };

  public static Logger(logDir: string | undefined) {
    logDir = logDir || `${appRoot}/logs/`;
    return winstonLogger(logDir);
  }

  private getLogger = () => {
    const logDir = this.options.logDir || `${this.appPath}/logs/`;
    return winstonLogger(logDir);
  };

  /**
   * For added set attribute of express application
   *
   * @param key     key
   * @param value   value
   * @returns  ExpressApplication
   */
  public applicationSet = (key: string, value: any) => {
    this.application.set(key, value);
    return this;
  };

  /**
   * Added view functionality of an express application
   *
   *
   * @returns  ExpressApplication
   */
  public addView = () => {
    const viewEngine = this.options.viewEngine || ViewEngine.HBS;
    const viewDir = this.options.viewDir || `${this.appPath}/views/`;
    this.applicationSet("views", viewDir);
    this.applicationSet("view engine", viewEngine);
    return this;
  };

  public addStaticContent = () => {
    const staticContent =
      this.options.staticContentDir || `${this.appPath}/public/`;
    this.application.use(express.static(staticContent));
    return this;
  };

  public addJSONParser = () => {
    this.addMiddleware(express.json());
    this.addMiddleware(express.urlencoded({ extended: false }));
    return this;
  };

  public updateNotifier = (packageJsonPath: string) => {
    const pkg = require("./package.json");
    const notifier = updateNotifier({ pkg });
    notifier.notify();

    return this;
  };
  public addCookieParser = () => {
    this.applicationSet("trust proxy", 1);
    this.addMiddleware(cookieParser());
    return this;
  };

  public addCsrf = () => {
    let options = this.options.csrf;
    if (!options) {
      options = { cookie: true };
    }
    this.addMiddleware(csurf(options));
    return this;
  };

  public addMethodOverwriteHeader = () => {
    this.addMiddleware(methodOverride("X-HTTP-Method"));
    this.addMiddleware(methodOverride("X-HTTP-Method-Override"));
    this.addMiddleware(methodOverride("X-Method-Override"));
    return this;
  };

  public addServerFavicon = () => {
    const fabIcon = this.options.fabIconPath || "./public/images/favicon.ico";
    this.addMiddleware(favicon(fabIcon));
    return this;
  };

  public addHelmet = () => {
    let options = this.options.helmet || undefined;
    if (!options) {
      options = {};
    }
    this.addMiddleware(helmet({ ...options }));
    return this;
  };

  public addFileUpload = () => {
    this.addMiddleware(expressFileUpload());
    return this;
  };

  public addRateLimiter = () => {
    this.addMiddleware(rateLimit(this.options.rateLimiter));
    return this;
  };

  public addCors = () => {
    this.addMiddleware(cors());
    return this;
  };

  public addSession = () => {
    this.addMiddleware(session(this.options.session));
    return this;
  };

  public addCompression = () => {
    this.addMiddleware(compression(this.options.compression));
    return this;
  };

  public addResponseTime = () => {
    this.addMiddleware(responseTime());
    return this;
  };

  public addDefaultMiddleware = () => {
    this.addCookieParser()
      .addJSONParser()
      .addMethodOverwriteHeader()
      .addHelmet()
      .addCors()
      .addCompression()
      .addResponseTime();

    return this;
  };

  public addErrorHandler = (
    handler: (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => void
  ) => {
    this.application.use(handler);
    return this;
  };

  public startServerSync: Function = async (): Promise<ExpressApplication> => {
    const hostName = this.options.appHost || "127.0.0.1";
    const port = this.options.appPort || 3000;
    const serverListen = await this.application.listen(port, hostName);
    this.debugger(`Server listening on port ${port}`);
    const appName = `\n${this.options.appName || "ExpressApplication"}\n`;
    this.getLogger().info(figlet.textSync(appName));
    this.getLogger().info(`Server listening on ${hostName}:${port}`);
    return this;
  };
}
