import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import { BoletoService } from "../domain/boleto.service";
import { errorController } from "../../../util/exceptions/errosController";
import validate from "../../../middleware/validate";
import { relatorioShema } from "./dto/boletoSchemas";
import validateFile from "../../../middleware/validateFile";



export class BoletoController {
    public path = '/boletos';
    public router = express.Router();
    private upload


    constructor(upload: Multer = multer()) {
        this.upload = upload
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post(`${this.path}/csv`, this.upload.single('csv'), validateFile("text/csv"), this.importCSV)
        this.router.post(`${this.path}/pdf`, this.upload.single('pdf'), validateFile("application/pdf"), this.importPDF)
        this.router.get(`${this.path}/boletos`, this.orderPDF)
        this.router.get(`${this.path}`, validate(relatorioShema), this.report)
    }

    async importCSV(req: Request, res: Response) {
        const boletoService = new BoletoService();
        try {
           console.log(req.file)
            const result = await boletoService.importCSV(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
            return errorController(error, res)
        }

    }

    async importPDF(req: Request, res: Response) {
        const boletoService = new BoletoService();

        try {
            const result = await boletoService.splitPDF(req.file as Express.Multer.File)
            res.status(200).json(result)
        } catch (error) {
            return errorController(error, res)


        }
    }

    async orderPDF(req: Request, res: Response) {
        try {
            const boletoService = new BoletoService();
            const data = await boletoService.boletosOrderByOrdemPdf()

            return res.end(data)
        } catch (error) {
            return errorController(error, res)
        }

    }


    async report(req: Request, res: Response) {

        try {

            const boletoService = new BoletoService();
            const data = await boletoService.report()

            return res.end(data)
        } catch (error) {
            return errorController(error, res)
        }
    }


}

