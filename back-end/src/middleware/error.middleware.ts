import { Request, Response } from "express";

import HttpError from "../errors/HttpError";

function errorMiddleware(
  error: HttpError,
  request: Request,
  response: Response
) {
  const status = error.status || 500;
  const message = error.message || "Oops, Something went wrong";
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
