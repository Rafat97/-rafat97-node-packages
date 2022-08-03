import { Request, Response, NextFunction } from "express";
import { UnprocessableEntityValidation } from "@rafat97/exceptionhandler";

export const authorizationHeaderVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  const getContentType =
    headers["Authorization"] || headers["authorization"] || "";
  if (getContentType === "") {
    throw new UnprocessableEntityValidation("Invalid Authorization Header");
  }
  next();
};
