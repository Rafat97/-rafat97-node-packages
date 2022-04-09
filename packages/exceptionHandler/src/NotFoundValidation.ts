import { CustomError } from "./CustomError";

export class NotFoundValidation extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundValidation.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
