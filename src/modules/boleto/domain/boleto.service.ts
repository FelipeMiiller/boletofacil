

import { csvParser } from "../../../util/csvParser"
import { IBoletoRepository, boletoRepository as BoletoRepository } from "./repository/boleto.repository"
import { IloteRepository, loteRepository as LoteRepository } from "../../lote/domain/repository/lote.repository"



export class BoletoService {


    constructor(
        private boletoRepository: IBoletoRepository = BoletoRepository,
        private loteRepository: IloteRepository = LoteRepository


    ) { }

    async boletoCSV(data: Express.Multer.File) {

        try {
            const boleto = csvParser(data)




        } catch (error) {

        }


    }
}