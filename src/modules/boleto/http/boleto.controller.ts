import express, { Request, Response } from "express";
import multer, { Multer } from "multer";

import { BoletoService } from "../domain/boleto.service";
import { errorController } from "../../../util/exceptions/errosController";



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
        this.router.get(`${this.path}/relatorio`, this.relatorio)
    }

    async csv(req: Request, res: Response) {
        const boletoService = new BoletoService();
        try {
            const result = await boletoService.boletoCSV(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
            return errorController(error, res)
        }

    }

    async relatorio(req: Request, res: Response) {
     
        const boletoService = new BoletoService();
        const data = await boletoService.relatorio()

        return res.end(data)

        
 


}}
