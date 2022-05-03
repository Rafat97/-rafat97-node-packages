import express, { Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IMethods } from "./IMethods";


export class ExpressApplicationRouter implements IMethods {
  private route: Router;

  public constructor() {
    this.route = express.Router();

    Object.setPrototypeOf(this, ExpressApplicationRouter.prototype);
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
    this.route.options(path, handlers);
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
    this.route.get(path, handlers);
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
    this.route.get(path, handlers);
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
    this.route.post(path, handlers);
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
    this.route.delete(path, handlers);
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
    this.route.patch(path, handlers);
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
    this.route.all(path, handlers);
    return this;
  }

  public addMiddleware(
    handler: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => void
  ) {
    this.route.use(handler);
    return this;
  }

  public getRouter(): Router {
    return this.route;
  }
}
