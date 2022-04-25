import { CustomError, CustomErrorObject } from "./CustomError";

/*
429 Too Many Requests
The user has sent too many requests in a given amount of time ("rate limiting").
*/

export class TooManyRequestsException extends CustomError {
  statusCode = 429;

  constructor(public message: string = "Unsupported Media Type") {
    super(message);
    Object.setPrototypeOf(this, TooManyRequestsException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
