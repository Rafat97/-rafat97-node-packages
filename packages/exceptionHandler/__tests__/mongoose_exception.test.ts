import { MongooseError } from "../src/index";

describe("MongooseError", () => {
  it("should return Undefined Error ", () => {
    const wrapper = new MongooseError("", 0);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Undefined Error", details: [] });
  });

  it("should return empty param will return `Duplicate key found` ", () => {
    const wrapper = new MongooseError("", 11000);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Duplicate key found", details: [] });
  });

  it("should return not empty param will return same message ", () => {
    const wrapper = new MongooseError("Email already exist", 11000);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({ message: "Email already exist", details: [] });
  });
});
