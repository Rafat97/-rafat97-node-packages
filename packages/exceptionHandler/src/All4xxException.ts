import { CustomError, CustomErrorObject } from "./CustomError";

export class All4xxException extends CustomError {
  statusCode = 404;

  constructor(public message: string, statusCode: number = 400) {
    super(message);
    if (statusCode >= 400 && statusCode < 500) {
      this.statusCode = statusCode || this.statusCode;
    }

    Object.setPrototypeOf(this, All4xxException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
