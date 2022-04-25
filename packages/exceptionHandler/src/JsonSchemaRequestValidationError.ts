import { CustomError, CustomErrorObject } from "./CustomError";
import { ErrorObject } from "ajv";

export class JsonSchemaRequestValidationError extends CustomError {
  statusCode = 400;

  constructor(
    public message: string,
    public errors?: Object[] | ErrorObject[] | null | undefined
  ) {
    super(message);
    Object.setPrototypeOf(this, JsonSchemaRequestValidationError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: this.errors };
  }
}
