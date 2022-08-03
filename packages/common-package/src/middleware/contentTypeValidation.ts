import { Request, Response, NextFunction } from "express";
import { UnprocessableEntityValidation } from "@rafat97/exceptionhandler";

export const contentTypeValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  const getContentType =
    headers["content-type"] || headers["Content-Type"] || "";
  if (getContentType !== "application/json") {
    throw new UnprocessableEntityValidation("Invalid Content-Type");
  }
  next();
};
