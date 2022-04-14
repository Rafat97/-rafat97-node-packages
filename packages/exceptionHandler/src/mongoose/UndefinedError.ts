import { CommonMongoServerError } from "./CommonMongoServerError";

export class UndefinedError extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = 0;
  message = "Undefined Error";

  constructor() {
    super("Undefined Error");
    Object.setPrototypeOf(this, UndefinedError.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
