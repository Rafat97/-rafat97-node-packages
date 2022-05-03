import express, { Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IMethods } from "./IMethods";
import { ExpressApplicationRouter } from "./ExpressApplicationRouter";
import debug from "debug";
import appRoot from "app-root-path";
import { morganMiddleware } from "./logger";
import { winstonLogger } from "./logger";
import figlet from "figlet";

export enum ViewEngine {
  HBS = "hbs",
  PUG = "pug",
  EJS = "ejs",
  JADE = "jade",
}

export interface IOptions {
  appName?: string;
  logDir?: string;
  viewDir?: string;
  viewEngine?: string;
  staticContentDir?: string;
}

export class ExpressApplication implements IMethods {
  private application: Express;
  private options: IOptions;
  private debugger: debug.IDebugger;
  private appPath = appRoot;

  public constructor(options?: IOptions) {
    this.application = express();
    this.options = options || {};
    this.debugger = debug(`${this.options.appName || "ExpressApplication"}`);

    // default support
    this.addLogger();

    Object.setPrototypeOf(this, ExpressApplication.prototype);
  }

  public addLogger() {
    const logDir = this.options.logDir || `${this.appPath}/logs/`;
    this.addMiddleware(morganMiddleware(logDir));
    return this;
  }

  public optionsMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.options(path, handlers);
    return this;
  }

  public putMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.get(path, handlers);
    return this;
  }

  public getMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.get(path, handlers);
    return this;
  }

  public postMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.post(path, handlers);
    return this;
  }

  public deleteMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.delete(path, handlers);
    return this;
  }

  public patchMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.patch(path, handlers);
    return this;
  }

  public allMethod(
    path: string,
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this {
    this.application.all(path, handlers);
    return this;
  }

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

  public addMultipleMiddleware(
    ...handlers: express.RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ) {
    for (const handlerMiddleware of handlers) {
      this.application.use(handlerMiddleware);
    }
    return this;
  }

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

  public getLogger() {
    const logDir = this.options.logDir || `${this.appPath}/logs/`;
    return winstonLogger(logDir);
  }

  public applicationSet(key: string, value: any) {
    this.application.set(key, value);
    return this;
  }

  public addView() {
    const viewEngine = this.options.viewEngine || ViewEngine.HBS;
    const viewDir = this.options.viewDir || `${this.appPath}/views/`;
    this.applicationSet("views", viewDir);
    this.applicationSet("view engine", viewEngine);
    return this;
  }

  public addStaticContent() {
    const staticContent =
      this.options.staticContentDir || `${this.appPath}/public/`;
    this.application.use(express.static(staticContent));
    return this;
  }

  public addJSONParser() {
    this.addMiddleware(express.json());
    this.addMiddleware(express.urlencoded({ extended: false }));
    return this;
  }

  public addErrorHandler(
    handler: (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => void
  ) {
    this.application.use(handler);
    return this;
  }

  public startServerSync: Function = async (
    port: number = 3000
  ): Promise<ExpressApplication> => {
    const serverListen = await this.application.listen(port);
    this.debugger(`Server listening on port ${port}`);
    const appName = `\n${this.options.appName || "ExpressApplication"}\n`;
    this.getLogger().info(figlet.textSync(appName));
    this.getLogger().info(`Server listening on port ${port}`);
    return this;
  };
}
