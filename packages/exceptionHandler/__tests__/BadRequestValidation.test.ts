import { BadRequestValidation } from "../src/index";

describe("BadRequestValidation", () => {
  it("should return custom message ", () => {
    const wrapper = new BadRequestValidation("Bad Request");
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Bad Request", details: [] });
  });

  it("should return status code 403 ", () => {
    const wrapper = new BadRequestValidation("Bad Request");
    const result = wrapper.getStatusCode();
    expect(result).toBe(400);
  });
});
