import { CustomError, CustomErrorObject } from "./CustomError";

/*
415 Unsupported Media Type
The media format of the requested data is not supported by the server,
so the server is rejecting the request.
*/

export class UnsupportedMediaTypeException extends CustomError {
  statusCode = 415;

  constructor(public message: string = "Unsupported Media Type") {
    super(message);
    Object.setPrototypeOf(this, UnsupportedMediaTypeException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
