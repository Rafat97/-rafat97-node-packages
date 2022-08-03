import { Request, Response, NextFunction } from "express";
// import * as api from "@opentelemetry/api";
import { CustomError } from "@rafat97/exceptionhandler";

export function ExpressErrorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const activeSpan = api.trace.getSpan(api.context.active());
  // activeSpan?.recordException(err);
  // console.error(`Critical error`, {
  //   traceId: activeSpan?.spanContext().traceId,
  // });

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ ...err.serializeErrors() });
  }

  return res.status(500).send({
    message: err.message,
    details: [],
  });
}
