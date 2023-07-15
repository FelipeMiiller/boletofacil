import { Response } from "express";
import HttpException from "./HttpExceptions";



export function errorController(error: unknown, response: Response): Response {
    if (error instanceof HttpException) {
        const sendError = {
            status: error.status || 500,
            name: error.name || 'Something went wrong',
            message: error.message || 'Something went wrong'

        }

       return response.status(sendError.status).send(sendError);

    }

   return response.status(500).send('Something went wrong');
}