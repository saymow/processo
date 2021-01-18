export enum ERRORS {
  USER_ALREADY_REGISTERED = "USER_ALREADY_REGISTERED",
  USER_INVALID_TOKEN = "USER_INVALID_TOKEN",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_UNAUTHORIZED = "USER_UNAUTHORIZED",
  USER_INVALID_CREDENTIALS = "USER_INVALID_CREDENTIALS",
}

export class AppError {
  message: ERRORS | string;
  statusCode: number;
  stack = new Error().stack;

  constructor(message: ERRORS | string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
