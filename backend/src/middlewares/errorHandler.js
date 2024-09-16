import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError)
    res
      .status(error.status)
      .send({ status: error.status, message: error.name, data: error });

  res
    .status(500)
    .send({ status: 500, message: 'Something went wrong', data: error });
};
