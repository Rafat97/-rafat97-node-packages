import {
  UnauthorizedException,
  All4xxException,
  All5xxException,
} from "@rafat97/exceptionhandler";
import middy from "@middy/core";
import {
  ContentTypeApplicationJson,
  ErrorHandlerMiddleware,
} from "../src/index";

describe("ContentTypeApplicationJson.test", () => {
  it("should return error", async () => {
    const handler = middy((event: any) => {
      return event;
    });

    const event = {
      headers: {},
      body: '{ "foo" :   "bar"   }',
    };

    handler.use(ContentTypeApplicationJson()).use(ErrorHandlerMiddleware());

    const response = await handler(event, {}, {});
    expect(response.statusCode).toBe(422);
    expect(response.body).toBe(
      JSON.stringify({
        message: "Invalid content type",
        details: [],
      })
    );
  });

  it("should return custom event value", async () => {
    const handler = middy((event: any) => {
      return event;
    });

    const event = {
      headers: {
        "content-type": "application/json",
      },
      body: '{ "foo" :   "bar"   }',
    };

    handler.use(ContentTypeApplicationJson()).use(ErrorHandlerMiddleware());

    const response = await handler(event, {}, {});
    expect(response).toBe(event);
  });
});
