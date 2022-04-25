import { CustomError, CustomErrorObject } from "../CustomError";

export interface MongooseCustomErrorObject extends CustomErrorObject {
  mongoServerErrorCode: number;
}
export abstract class CommonMongoServerError extends CustomError {
  abstract statusCode: number;
  abstract mongoServerErrorCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CommonMongoServerError.prototype);
  }

  abstract getMongoDbErrorCode(): number;

  abstract serializeErrors(): MongooseCustomErrorObject;
}
