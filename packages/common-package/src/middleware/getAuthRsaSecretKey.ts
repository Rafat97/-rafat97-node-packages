import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { BadRequestValidation } from "@rafat97/exceptionhandler";

const RSA_KEY_PAIR_URL = "http://jwk-generator:80/private/key_pairs";
const JWKs_KEY_PAIR_URL = "http://jwk-generator:80/.well-known/jwks.json";
const AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getAuthRsaSecretKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key_pairs = await axios.post(
      RSA_KEY_PAIR_URL,
      JSON.stringify({}),
      AXIOS_CONFIG
    );
    const { data } = key_pairs;
    process.env.AUTH_RSA_PRIVATE_KEY = data[0].privateKey;
    process.env.AUTH_RSA_PUBLIC_KEY = data[0].publicKey;
  } catch (error) {
    console.log(error);
    throw new BadRequestValidation("Error Key Pair API Call");
  }
  next();
};
