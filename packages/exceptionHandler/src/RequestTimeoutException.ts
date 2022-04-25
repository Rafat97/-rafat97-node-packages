import { CustomError, CustomErrorObject } from "./CustomError";

/*
408 Request Timeout
This response is sent on an idle connection by some servers,
even without any previous request by the client.
It means that the server would like to shut down this unused connection.
This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use
HTTP pre-connection mechanisms to speed up surfing.
Also note that some servers merely shut down the connection without sending this message.
*/

export class RequestTimeoutException extends CustomError {
  statusCode = 408;

  constructor(public message: string = "Request Timeout") {
    super(message);
    Object.setPrototypeOf(this, RequestTimeoutException.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrors(): CustomErrorObject {
    return { message: this.message, details: [] };
  }
}
