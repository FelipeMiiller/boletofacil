
import express, { NextFunction } from 'express';




const validateFile = (mimetype: "text/csv" | "application/pdf") => {
  return async (
    request: express.Request,
    response: express.Response,
    next: NextFunction,
  ) => {

    if (mimetype === request.file?.mimetype) {
      return next();
    }

    const sendError = {
      status: 422,
      name: 'Unprocessable Entity',
      message: `Invalid mimetype, not is ${mimetype} !!!`

    }

    response.status(sendError.status).send(sendError);
  };
}
export default validateFile