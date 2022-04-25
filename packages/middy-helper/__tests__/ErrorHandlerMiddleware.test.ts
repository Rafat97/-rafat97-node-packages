import {
  UnauthorizedException,
  All4xxException,
  All5xxException,
} from "@rafat97/exceptionhandler";
import middy from "@middy/core";
import { ErrorHandlerMiddleware } from "../src/index";

describe("ErrorHandlerMiddleware", () => {
  it("should return custom Custom error message", async () => {
    const handler = middy(() => {
      throw Error("Custom error");
    });
    handler.use(ErrorHandlerMiddleware());
    const response = await handler({}, {}, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ message: "Custom error" }));
  });

  it("should return custom empty", async () => {
    const handler = middy(() => {
      throw Error();
    });
    handler.use(ErrorHandlerMiddleware());
    const response = await handler({}, {}, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ message: "" }));
  });

  it("should return Unauthorized with 401", async () => {
    const handler = middy(() => {
      throw new UnauthorizedException();
    });
    handler.use(ErrorHandlerMiddleware());
    const response = await handler({}, {}, {});
    expect(response.statusCode).toBe(401);
    expect(response.body).toBe(
      JSON.stringify({ message: "Unauthorized", details: [] })
    );
  });

  it("should return All 4xx error handler except default 400", async () => {
    const handler = middy(() => {
      throw new All4xxException("All 4xx error");
    });

    handler.use(ErrorHandlerMiddleware());

    let response = await handler({}, {}, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 4xx error", details: [] })
    );

    const handler2 = middy(() => {
      throw new All4xxException("All 4xx error", 404);
    });
    handler2.use(ErrorHandlerMiddleware());
    response = await handler2({}, {}, {});
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 4xx error", details: [] })
    );

    const handler3 = middy(() => {
      throw new All4xxException("All 4xx error", 505);
    });
    handler3.use(ErrorHandlerMiddleware());
    response = await handler3({}, {}, {});
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 4xx error", details: [] })
    );
  });

  it("should return All 5xx error handler except default 500", async () => {
    const handler = middy(() => {
      throw new All5xxException("All 5xx error");
    });

    handler.use(ErrorHandlerMiddleware());

    let response = await handler({}, {}, {});
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 5xx error", details: [] })
    );

    const handler2 = middy(() => {
      throw new All5xxException("All 5xx error", 501);
    });
    handler2.use(ErrorHandlerMiddleware());
    response = await handler2({}, {}, {});
    expect(response.statusCode).toBe(501);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 5xx error", details: [] })
    );

    const handler3 = middy(() => {
      throw new All5xxException("All 5xx error", 406);
    });
    handler3.use(ErrorHandlerMiddleware());
    response = await handler3({}, {}, {});
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(
      JSON.stringify({ message: "All 5xx error", details: [] })
    );
  });
});
