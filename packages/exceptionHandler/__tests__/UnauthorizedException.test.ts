import { UnauthorizedException } from "../src/index";

describe("UnauthorizedException", () => {
  it("should return Unauthorized message ", () => {
    const wrapper = new UnauthorizedException();
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Unauthorized", details: [] });
  });

  it("should return custom message ", () => {
    const wrapper = new UnauthorizedException("Not Authorized");
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Not Authorized", details: [] });
  });

  it("should return status code 403 ", () => {
    const wrapper = new UnauthorizedException("Not Authorized");
    const result = wrapper.getStatusCode();
    expect(result).toBe(403);
  });
});
