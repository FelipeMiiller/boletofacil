import express, { Request, Response } from "express";
import { errorController } from "../../../util/exceptions/errosController";
import { ILote, loteRepository } from "../domain/repository/lote.repository";
import { createLoteSchema, createManyLotesSchema } from "./dto/loteSchemas";
import validate from "../../../middleware/validate";



export class LoteController {
    public path = '/lotes';
    public router = express.Router();



    constructor() {

        this.initializeRoutes();
    }

    public initializeRoutes() {

       
        this.router.post(`${this.path}`,validate(createLoteSchema), this.create)
        this.router.post(`${this.path}/many`,validate(createManyLotesSchema), this.createMany)
    }

    async create(req: Request, res: Response) {
      const data:Omit<ILote, 'id'> =  req.body
      try {
        const result= await loteRepository.create({...data});
    
            res.status(201).json(result)
        } catch (error) {
          return  errorController(error, res)
        }

    }


    async createMany(req: Request, res: Response) {
        const data:Omit<ILote, 'id'>[] =  req.body
        try {
          const result= await loteRepository.createMany(data);
      
              res.status(201).json(result)
          } catch (error) {
            return  errorController(error, res)
          }
  
      }


}
