
import express, { NextFunction } from 'express';




const validateFile = (fieldname: "application/csv" | "application/pdf") => {
  return async (
    request: express.Request,
    response: express.Response,
    next: NextFunction,
  ) => {

    if (fieldname === request.file?.mimetype) {
      return next();
    }

    const sendError = {
      status: 422,
      name: 'Unprocessable Entity',
      message: `Invalid fieldname, not is ${fieldname} !!!`

    }

    response.status(sendError.status).send(sendError);
  };
}
export default validateFile