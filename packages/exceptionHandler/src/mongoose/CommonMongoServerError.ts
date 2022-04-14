import { CustomError } from "../CustomError";

interface CustomErrorObject {
  message: string;
  details?: Object[] | null | undefined;
}

export abstract class CommonMongoServerError extends CustomError {
  abstract statusCode: number;
  abstract mongoServerErrorCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CommonMongoServerError.prototype);
  }

  abstract serializeErrors(): CustomErrorObject;
}
