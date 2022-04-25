import { UnprocessableEntityValidation } from "@rafat97/exceptionhandler";

const contentTypeCheck = (headers:any) => {
  const content_type =
    headers["content-type"] ||
    headers["Content-Type"] ||
    headers["CONTENT-TYPE"] ||
    "";

  if (content_type !== "application/json") {
    throw new UnprocessableEntityValidation("Invalid content type");
  }
};

const ContentTypeApplicationJson = (opts = {}) => {
  const customMiddlewareBefore = async (request:any) => {
    const { headers, httpMethod } = request.event;
    const httpMethodNotCheckContentType = ["GET", "HEAD"];
    if (!httpMethodNotCheckContentType.includes(httpMethod)) {
      contentTypeCheck(headers);
    }
  };

  return {
    before: customMiddlewareBefore,
  };
};

export { ContentTypeApplicationJson };
