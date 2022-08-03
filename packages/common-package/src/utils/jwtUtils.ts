import jwt from "jsonwebtoken";

/**
 *
 * How to use
 *
 const user = {
    id: userLoginInfo._id,
    email: userLoginInfo.email,
    firstName: userLoginInfo.firstName,
    lastName: userLoginInfo.lastName,
  };

  const token = createJwtRsaToken(
    privateKey,
    user,
    "1h",
    JwtAudience.CLIENT,
    issuer
  );

  const responseObject = {
    ...token,
  };
 *
 */

export enum JwtAudience {
  CLIENT = "client",
  ADMIN = "admin",
}

export const createJwtRsaToken = (
  privateKey: string,
  userInfo: object,
  exp: string,
  aud: string = "",
  iss: string
) => {
  const audience = Buffer.from(aud).toString("base64");
  const token = jwt.sign(userInfo, privateKey, {
    algorithm: "RS256",
    expiresIn: exp,
    issuer: iss,
    audience: audience,
  });
  return {
    token: token,
    expired: exp,
  };
};

export const verifyJwtRsaToken = (
  publicKey: string,
  token: string,
  aud: string = "",
  iss: string
) => {
  const audience = Buffer.from(aud).toString("base64");
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    audience: audience,
    issuer: iss,
  });
};
