import { CustomError, CustomErrorObject } from "./CustomError";

export class All5xxException extends CustomError {
  statusCode = 500;

  constructor(public message: string, statusCode: number = 500) {
    super(message);
    if (statusCode >= 500 && statusCode < 600) {
      this.statusCode = statusCode || this.statusCode;
    }

    Object.setPrototypeOf(this, All5xxException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
