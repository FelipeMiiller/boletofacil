import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import { csvParser } from "../../../util/csvParser";



export class BoletosController {
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

    async csv(req: Request, res: Response) {
        const file = req.file
        const result = await csvParser(file!)

        console.log(result)


        res.status(200).json(result)
    }


}
