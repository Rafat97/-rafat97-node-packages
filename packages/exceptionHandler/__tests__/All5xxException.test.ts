import { All5xxException } from "../src/index";

describe("All5xxException.test", () => {
  it("should return custom message ", () => {
    const wrapper = new All5xxException("");
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "", details: [] });
  });

  it("should return status code 501 ", () => {
    const wrapper = new All5xxException("Server Error", 501);
    const result = wrapper.getStatusCode();
    expect(result).toBe(501);
  });

  it("should return status code 500 ", () => {
    const wrapper = new All5xxException("", 485);
    const result = wrapper.getStatusCode();
    expect(result).toBe(500);
  });

  it("should return the details value", () => {
    const wrapper = new All5xxException("Server Error", 485, [
      { test: "test" },
    ]);
    const result = wrapper.getStatusCode();
    expect(result).toBe(500);
    const result2 = wrapper.serializeErrors();
    expect(result2.details).toEqual([{ test: "test" }]);
  });
});
