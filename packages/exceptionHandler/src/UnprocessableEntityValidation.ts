import { CustomError, CustomErrorObject } from "./CustomError";

export class UnprocessableEntityValidation extends CustomError {
  statusCode = 422;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableEntityValidation.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
