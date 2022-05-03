import { RequestHandler, NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface IMethods {
  getMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  postMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  deleteMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  putMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  patchMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  optionsMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  allMethod(
    path: string,
    ...handlers: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[]
  ): this;

  addMiddleware(
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): this;
}

// export abstract class AbstractExpressApplicationMethods {
//   private app: Express | null = null;
//   private appRoute: Router | null = null;
//   private type: string;

//   constructor(app: "express" | "express-router") {
//     this.type = app;
//     this.createInstance();

//     Object.setPrototypeOf(this, AbstractExpressApplicationMethods.prototype);
//   }

//   private createInstance() {
//     if (this.type === "express") {
//       this.app = express();
//     } else if (this.type === "express-router") {
//       this.appRoute = express.Router();
//     }
//   }

//   public getInstance() {
//     if (this.type === "express") {
//       return this.app as Express;
//     } else if (this.type === "express-router") {
//       return this.appRoute as Router;
//     }
//   }

//   public getMethod(
//     path: string,
//     ...handlers: RequestHandler<
//       ParamsDictionary,
//       any,
//       any,
//       ParsedQs,
//       Record<string, any>
//     >[]
//   ) {
//     this.getInstance()?.get(path, handlers);
//     return this;
//   }

//   public addMiddleware(
//     handler: (
//       req: express.Request,
//       res: express.Response,
//       next: express.NextFunction
//     ) => void
//   ) {
//     this.getInstance()?.use(handler);
//     return this;
//   }
// }
