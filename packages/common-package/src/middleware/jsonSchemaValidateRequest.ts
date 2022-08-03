import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { JsonSchemaRequestValidationError } from "@rafat97/exceptionhandler";

const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
addFormats(ajv);

export const jsonSchemaValidateRequest =
  (SCHEMA_FILE: Object) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!SCHEMA_FILE.hasOwnProperty("type")) {
      throw new Error("schema file should not have a `type` property");
    }
    if (!SCHEMA_FILE.hasOwnProperty("properties")) {
      throw new Error("schema file should not have a `properties` property");
    }

    const validate = ajv.compile(SCHEMA_FILE);
    const valid = validate(req.body);
    if (!valid) {
      throw new JsonSchemaRequestValidationError(
        "RequestValidationError",
        validate.errors
      );
    }

    next();
  };
