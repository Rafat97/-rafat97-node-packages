import {
  CommonMongoServerError,
  MongooseCustomErrorObject,
} from "./CommonMongoServerError";

export class UndefinedError extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = 0;
  message = "Undefined Error";

  constructor() {
    super("Undefined Error");
    Object.setPrototypeOf(this, UndefinedError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMongoDbErrorCode(): number {
    return this.mongoServerErrorCode;
  }

  serializeErrors(): MongooseCustomErrorObject {
    return {
      message: this.message,
      details: [],
      mongoServerErrorCode: this.mongoServerErrorCode,
    };
  }
}
