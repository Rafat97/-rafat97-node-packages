import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const keyLength = 64;

export const createPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, keyLength)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
};

export const comperePassword = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString("hex") === hashedPassword;
};
