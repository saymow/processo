import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "yup";
import { AppError } from "../errors";

export const handleRouteNotFound = (req: Request) => {
  throw new AppError(`Not found - ${req.originalUrl}`);
};

export const handleError = (
  error: Error,
  __: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (error instanceof ValidationError) {
    const errorsMap: Record<string, string> = {};

    error.inner.map(({ path, message }) => {
      errorsMap[path as any] = message;
    });

    return res.status(400).send({ type: "Invalid fields", fields: errorsMap });
  }

  if (error instanceof QueryFailedError) {
    console.log(error);

    const [message] = error.message.split('"');
    return res.status(400).send({ message });
  }

  console.error(`Unexpected error ${error}`);

  return res.status(500).send({ message: "Internal server error." });
};
