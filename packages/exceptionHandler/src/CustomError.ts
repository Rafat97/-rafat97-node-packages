interface CustomErrorObject {
  message: string;
  details?: Object[] | null | undefined;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): CustomErrorObject;
}
