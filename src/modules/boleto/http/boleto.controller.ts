import express, { Request, Response } from "express";
import multer, { Multer } from "multer";

import { BoletoService } from "../domain/boleto.service";
import { errorController } from "../../../util/exceptions/errosController";
import validate from "../../../middleware/validate";
import { relatorioShema } from "./dto/createLoteSchema";



export class BoletoController {
    public path = '/boletos';
    public router = express.Router();
    private upload


    constructor(upload: Multer = multer()) {
        this.upload = upload
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post(`${this.path}/csv`, this.upload.single('csv'), this.importCSV)
        this.router.post(`${this.path}/pdf`, this.upload.single('pdf'), this.importPDF)
        this.router.get(`${this.path}/boletos`, this.boletos)
        this.router.get(`${this.path}`, validate(relatorioShema), this.relatorio)
    }

    async importCSV(req: Request, res: Response) {
        const boletoService = new BoletoService();
        try {
            const result = await boletoService.boletoCSV(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
            return errorController(error, res)
        }

    }

    async importPDF(req: Request, res: Response) {
        const boletoService = new BoletoService();
        try {

            const result = await boletoService.boletosPDF(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
            return errorController(error, res)
        }

    }

    async boletos(req: Request, res: Response) {
        try {
            const boletoService = new BoletoService();
            const data = await boletoService.boletos()

            return res.end(data)
        } catch (error) {
            return errorController(error, res)
        }

    }


    async relatorio(req: Request, res: Response) {

        try {

            const boletoService = new BoletoService();
            const data = await boletoService.relatorio()

            return res.end(data)
        } catch (error) {
            return errorController(error, res)
        }
    }


}

