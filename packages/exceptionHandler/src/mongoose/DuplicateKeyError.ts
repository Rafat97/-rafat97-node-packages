import { CommonMongoServerError } from "./CommonMongoServerError";

export class DuplicateKey extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = 11000;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DuplicateKey.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
