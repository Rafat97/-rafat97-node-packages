import { UndefinedError } from "./UndefinedError";
import { DuplicateKey } from "./DuplicateKeyError";
import { CommonMongoServerError } from "./CommonMongoServerError";

export class MongooseError extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = -1;
  errorObject = { message: "None", details: [] };

  constructor(message: string, mongoServerErrorCode: number) {
    super(message);
    Object.setPrototypeOf(this, MongooseError.prototype);
    this.errorObject = this.factoryErrorHandler(mongoServerErrorCode);
  }

  factoryErrorHandler(mongoServerErrorCode: number) {
    switch (mongoServerErrorCode) {
      case 11000:
        return new DuplicateKey(this.message).serializeErrors();
      default:
        return new UndefinedError().serializeErrors();
    }
  }

  serializeErrors() {
    return this.errorObject;
  }
}
