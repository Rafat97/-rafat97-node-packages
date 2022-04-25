import { UndefinedError } from "./UndefinedError";
import { DuplicateKey } from "./DuplicateKeyError";
import {
  CommonMongoServerError,
  MongooseCustomErrorObject,
} from "./CommonMongoServerError";
export class MongooseError extends CommonMongoServerError {
  statusCode = 409;
  mongoServerErrorCode = -1;
  errorObject: CommonMongoServerError;

  constructor(message: string, mongoServerErrorCode: number) {
    super(message);
    Object.setPrototypeOf(this, MongooseError.prototype);
    this.errorObject = this.factoryErrorHandler(mongoServerErrorCode);
  }

  factoryErrorHandler(mongoServerErrorCode: number): CommonMongoServerError {
    switch (mongoServerErrorCode) {
      case 11000:
        return new DuplicateKey(this.message);
      default:
        return new UndefinedError();
    }
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMongoDbErrorCode(): number {
    return this.errorObject.getMongoDbErrorCode();
  }

  serializeErrors(): MongooseCustomErrorObject {
    return this.errorObject.serializeErrors();
  }
}
