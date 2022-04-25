import { CustomError } from "./CustomError";

export class NotFoundValidation extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundValidation.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
