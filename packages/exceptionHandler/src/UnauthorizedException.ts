import { CustomError } from "./CustomError";

export class UnauthorizedException extends CustomError {
  statusCode = 403;

  constructor(public message: string = "Unauthorized") {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
