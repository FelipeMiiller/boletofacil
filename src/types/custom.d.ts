import { Request } from 'express';

declare namespace Express {
    interface Request {
      file: Express.Multer.File;
    }
  }