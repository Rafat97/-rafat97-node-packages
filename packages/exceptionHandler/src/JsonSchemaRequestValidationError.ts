import { CustomError } from "./CustomError";
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

  serializeErrors() {
    return { message: this.message, details: this.errors };
  }
}
