import { CustomError } from "./CustomError";

export class UnprocessableEntityValidation extends CustomError {
  statusCode = 422;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableEntityValidation.prototype);
  }

  serializeErrors() {
    return { message: this.message, details: [] };
  }
}
