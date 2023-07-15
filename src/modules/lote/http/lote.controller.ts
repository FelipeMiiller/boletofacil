import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import { csvParser } from "../../../util/csvParser";

import { errorController } from "../../../util/exceptions/errosController";
import { loteRepository } from "../domain/repository/lote.repository";



export class BoletoController {
    public path = '/boletos';
    public router = express.Router();
    private upload


    constructor(upload: Multer = multer()) {
        this.upload = upload
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post(`${this.path}/csv`, this.upload.single('file'), this.csv)
    }

    async create(req: Request, res: Response) {
        const boletoService =  loteRepository.create({});
        try {
            const result = await boletoService.boletoCSV(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
          return  errorController(error, res)
        }

    }


}
