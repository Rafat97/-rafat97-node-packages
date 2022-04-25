import { CustomError } from "./CustomError";

export class UnauthorizedException extends CustomError {
  statusCode = 403;

  constructor(public message: string = "Unauthorized") {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
