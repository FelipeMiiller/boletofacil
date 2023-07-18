import { BoletoService } from "../boleto.service";
import { Readable } from "stream";
describe('Should test service boleto', () => {

    const boletoService = new BoletoService();
    const csvFile = {
        fieldname: 'csv',
        originalname: 'boletos.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        destination: 'upload',
        filename: '60e2d77600bd3be990f62b4c4b6501b7',
        path: 'upload/60e2d77600bd3be990f62b4c4b6501b7',
        size: 106,
        buffer: Buffer.from('nome,unidade,valor,linha_digitavel\nJOSE DA SILVA,17,182.54,123456123456123456\nMARCOS ROBERTO,18,178.20,123456123456123456\nMARCIA CARVALHO,19,128.00,123456123456123456\n'),

    };
    const Boletos =
        [
            { nome: 'JOSE DA SILVA', unidade: '17', valor: '182.54', linha_digitavel: '123456123456123456' },
            { nome: 'MARCOS ROBERTO', unidade: '18', valor: '178.20', linha_digitavel: '123456123456123456' },
            { nome: 'MARCIA CARVALHO', unidade: '19', valor: '128.00', linha_digitavel: '123456123456123456' }
        ]
    const boletosFormat =
        [

            { nome: 'JOSE DA SILVA', unidade: 17, valor: 182.54, linha_digitavel: "123456123456123456" },
            { nome: 'MARCOS ROBERTO', unidade: 18, valor: 178.20, linha_digitavel: "123456123456123456" },
            { nome: 'MARCIA CARVALHO', unidade: 19, valor: 128.00, linha_digitavel: "123456123456123456" }

        ]

    const lotes =
        [
            { id: 1, nome: "JOSE DA SILVA", id_externo: 17, ativo: true },
            { id: 2, nome: "MARCOS ROBERTO", id_externo: 18, ativo: false },
            { id: 3, nome: "MARCIA CARVALHO", id_externo: 19, ativo: true },
        ]




    describe('Should test method boletoCSV', () => {
        it('should salve csv into table boleto', async () => {

            const boleto = await boletoService.importCSV(csvFile as Express.Multer.File)
            console.log(boleto)



        });

       
    });
})


