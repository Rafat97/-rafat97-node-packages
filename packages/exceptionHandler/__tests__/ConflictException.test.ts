import { ConflictException } from "../src/index";

describe("ConflictException", () => {
  it("should return custom message ", () => {
    const wrapper = new ConflictException("Conflict Exception");
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Conflict Exception", details: [] });
  });

  it("should return status code 403 ", () => {
    const wrapper = new ConflictException("Conflict Exception");
    const result = wrapper.getStatusCode();
    expect(result).toBe(409);
  });
});
