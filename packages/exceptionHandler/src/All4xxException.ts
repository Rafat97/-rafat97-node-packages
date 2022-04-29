import { CustomError, CustomErrorObject } from "./CustomError";

export class All4xxException extends CustomError {
  statusCode = 404;
  private details: object[];

  constructor(
    public message: string,
    statusCode: number = 400,
    details: object[] = []
  ) {
    super(message);
    if (statusCode >= 400 && statusCode < 500) {
      this.statusCode = statusCode || this.statusCode;
    }
    this.details = details;
    Object.setPrototypeOf(this, All4xxException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: this.details };
  }
}
