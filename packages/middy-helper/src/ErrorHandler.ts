import { CustomError } from "@rafat97/exceptionhandler";

/**
 *
 * Default Values of ErrorHandlerMiddleware
 *
 */
const defaultValue = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
};

/**
 * @function ErrorHandlerMiddleware
 *
 * @description This function is responsible for handling the error of lambda function.
 * this middleware will call onError occur
 *
 * @param {Object} opts   - Options for the middleware
 *
 *
 * @returns
 */
const ErrorHandlerMiddleware = (opts = {}) => {
  const options = {
    ...defaultValue,
    ...opts,
  };

  const customMiddlewareOnError = async (request: any) => {
    if (request.error instanceof CustomError) {
      return {
        ...options,
        statusCode: request.error.getStatusCode(),
        body: JSON.stringify(request.error.serializeErrors()),
      };
    }
    return {
      ...options,
      statusCode: 400,
      body: JSON.stringify({
        message: request.error.message,
      }),
    };
  };

  return {
    onError: customMiddlewareOnError,
  };
};

export { ErrorHandlerMiddleware };
