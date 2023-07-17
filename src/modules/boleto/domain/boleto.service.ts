

import { csvParser } from "../../../util/csvParser"
import { IBoletoRepository, boletoRepository as BoletoRepository, IBoleto } from "./repository/boleto.repository"
import { ILote, IloteRepository, loteRepository as LoteRepository } from "../../lote/domain/repository/lote.repository"
import HttpException, { DBException } from "../../../util/exceptions/HttpExceptions"


import { splitPDFPages } from "../../../util/splitPDFPages"
import { generateBoletos } from "../../../util/boletoGenerate"
import { generateBoletosReport } from "../../../util/relatorioGenerate"


type TCSVBoleto = {
    nome: string,
    unidade: string,
    valor: string,
    linha_digitavel: string
    ativo: boolean
}

type TCSVBoletoParse = {
    nome: string;
    unidade: number;
    valor: number;
    linha_digitavel: string;
}



export class BoletoService {

    constructor(
        private boletoRepository: IBoletoRepository = BoletoRepository,
        private loteRepository: IloteRepository = LoteRepository


    ) { }



    async boletoCSV(data: Express.Multer.File) {
        try {
            const boletosCSV = await csvParser(data) as unknown as Array<TCSVBoleto>

            const boletos = await this.findLotes(boletosCSV)
            const result = await this.boletoRepository.createMany(boletos)


            return result
        } catch (error) {
            if (error instanceof HttpException) {

                throw error;
            }

            throw new HttpException('Failed to create lote,unknown error !!!',);
        }

    }

    async boletosPDF(data: Express.Multer.File) {
        try {
            const lotes = await this.loteRepository.findAllOrderByOrdemPdf()
            const boletosPDF = await splitPDFPages(data, lotes)


            return boletosPDF
        } catch (error) {
            if (error instanceof HttpException) {

                throw error;
            }

            throw new HttpException('Failed to create lote,unknown error !!!',);
        }
    }



    async boletos() {
        try {
            const boletos = await this.boletoRepository.findAllOrderByOrdemPdf()

            return generateBoletos(boletos)
        } catch (error) {
            if (error instanceof HttpException) {

                throw error;
            }

            throw new HttpException('Failed to create lote,unknown error !!!',);
        }
    }

    async relatorio() {
        try {
            const boletos = await this.boletoRepository.findAll()

            return generateBoletosReport(boletos)
        } catch (error) {
            if (error instanceof HttpException) {

                throw error;
            }

            throw new HttpException('Failed to create lote,unknown error !!!',);
        }

    }


    private async findLotes(boletos: Array<TCSVBoleto>): Promise<Array<Omit<IBoleto, 'id'>>> {
        try {
            let boletosOfLotesNotFound: Array<TCSVBoletoParse> = []
            let lotesFind: Array<ILote> = []
            let boletosForSaved: Array<Omit<IBoleto, 'id'>> = []

            for (const boleto of boletos) {
                const boletoParse = {
                    nome: boleto.nome,
                    unidade: parseInt(boleto.unidade),
                    valor: parseFloat(boleto.valor),
                    linha_digitavel: boleto.linha_digitavel,
                    ativo: boleto.ativo || true
                }

                const lote = await this.loteRepository.findByIdExterno(boletoParse.unidade);

                if (lote) {

                    lotesFind.push(lote as ILote);
                    boletosForSaved.push({
                        nome_sacado: boletoParse.nome,
                        id_lote: lote.id,
                        valor: boletoParse.valor,
                        linha_digitavel: boletoParse.linha_digitavel,
                        ativo: boletoParse.ativo

                    })

                } else {
                    boletosOfLotesNotFound.push(boletoParse)
                }

            }

            if (boletosOfLotesNotFound.length > 0) {
                throw Error(JSON.stringify(boletosOfLotesNotFound));
            }

            return boletosForSaved

        } catch (error) {
            if (error instanceof DBException) {
                throw error
            }
            if (error instanceof Error) {
                throw new HttpException(error.message, "Lotes not found", 404);
            }

            throw new HttpException('Find Lotes error, unknown error !!!',);
        }



    }
}

