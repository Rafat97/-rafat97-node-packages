import { CustomError } from "./CustomError";

export class ConflictException extends CustomError {
  statusCode = 409;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
