import { CustomError, CustomErrorObject } from "./CustomError";

export class UnauthorizedException extends CustomError {
  statusCode = 401;

  constructor(public message: string = "Unauthorized") {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
