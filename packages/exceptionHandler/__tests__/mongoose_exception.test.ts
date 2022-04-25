import { MongooseError } from "../src/index";

describe("MongooseError", () => {
  it("should return Undefined Error ", () => {
    const wrapper = new MongooseError("", 0);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({
      message: "Undefined Error",
      details: [],
      mongoServerErrorCode: 0,
    });
  });

  it("should return empty param will return `Duplicate key found` ", () => {
    const wrapper = new MongooseError("", 11000);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({
      message: "Duplicate key found",
      details: [],
      mongoServerErrorCode: 11000,
    });
  });
  it("should return empty param will return `Duplicate key found` status code ", () => {
    const wrapper = new MongooseError("", 11000);
    const result = wrapper.getStatusCode();
    expect(result).toBe(409);
  });

  it("should return not empty param will return same message ", () => {
    const wrapper = new MongooseError("Email already exist", 11000);
    const result = wrapper.serializeErrors();
    expect(result).toEqual({
      message: "Email already exist",
      details: [],
      mongoServerErrorCode: 11000,
    });
  });

  it("should return the error code 11000", () => {
    const wrapper = new MongooseError("Email already exist", 11000);
    const result = wrapper.getMongoDbErrorCode();
    expect(result).toBe(11000);
  });

  it("should return the error code 0", () => {
    const wrapper = new MongooseError("", 0);
    const result = wrapper.getMongoDbErrorCode();
    expect(result).toBe(0);
  });
});
