import { CustomError } from "./CustomError";

export class BadRequestValidation extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestValidation.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
