import { CustomError } from "@rafat97/exceptionhandler";

const ErrorHandlerMiddleware = (opts = {}) => {
  const customMiddlewareOnError = async (request: any) => {
    if (request.error instanceof CustomError) {
      return {
        statusCode: request.error.getStatusCode(),
        body: JSON.stringify(request.error.serializeErrors()),
      };
    }
    return {
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
