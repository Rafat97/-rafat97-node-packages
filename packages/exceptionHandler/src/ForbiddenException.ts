import { CustomError, CustomErrorObject } from "./CustomError";

/*
403 Forbidden
The client does not have access rights to the content; that is,
it is unauthorized, so the server is refusing to give the requested resource.
Unlike 401 Unauthorized, the client's identity is known to the server.
*/

export class ForbiddenException extends CustomError {
  statusCode = 403;

  constructor(public message: string = "Forbidden") {
    super(message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
