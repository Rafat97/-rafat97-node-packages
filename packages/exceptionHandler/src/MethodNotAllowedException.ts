import { CustomError, CustomErrorObject } from "./CustomError";

/*
405 Method Not Allowed
The request method is known by the server but is not supported by the target resource.
For example, an API may not allow calling DELETE to remove a resource.
*/

export class MethodNotAllowedException extends CustomError {
  statusCode = 405;

  constructor(public message: string = "Method Not Allowed") {
    super(message);
    Object.setPrototypeOf(this, MethodNotAllowedException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
