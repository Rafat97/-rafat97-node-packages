import { UnprocessableEntityValidation } from "../src/index";

describe("UnprocessableEntityValidation", () => {
  it("should return custom message ", () => {
    const wrapper = new UnprocessableEntityValidation("Unprocessable Entity");
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Unprocessable Entity", details: [] });
  });

  it("should return status code 403 ", () => {
    const wrapper = new UnprocessableEntityValidation("Not Authorized");
    const result = wrapper.getStatusCode();
    expect(result).toBe(422);
  });
});
