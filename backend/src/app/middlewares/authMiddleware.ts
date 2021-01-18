import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../constants";
import { AppError, ERRORS } from "../errors";
import { UserRole } from "../models/User";

interface verifiedResponse {
  id: string;
  role: UserRole;
}

interface AuthOptions {
  role: UserRole[];
}

export default (options: AuthOptions) => (
  req: Request,
  _: Response,
  nextFn: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError(ERRORS.USER_INVALID_TOKEN, 401);

  let parts = authorization.split(" ");

  if (parts.length !== 2) throw new AppError(ERRORS.USER_INVALID_TOKEN, 401);

  let [schema, token] = parts;

  if (!/^Bearer$/.test(schema))
    throw new AppError(ERRORS.USER_INVALID_TOKEN, 401);

  jwt.verify(
    token,
    JWT_TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) throw new AppError(ERRORS.USER_INVALID_TOKEN, 401);

      const { id, role } = decoded as verifiedResponse;

      if (!options.role.includes(role))
        throw new AppError(ERRORS.USER_UNAUTHORIZED, 401);

      (req as any).user = {
        id,
        role,
      };

      return nextFn();
    }
  );
};
