import {
  CommonMongoServerError,
  MongooseCustomErrorObject,
} from "./CommonMongoServerError";

export class DuplicateKey extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = 11000;

  constructor(message: string) {
    super(message);
    if (message === "") {
      this.message = "Duplicate key found";
    }
    Object.setPrototypeOf(this, DuplicateKey.prototype);
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
