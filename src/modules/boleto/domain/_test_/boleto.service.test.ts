import { BoletoService } from "../boleto.service";

describe('Should test service boleto', () => {

    const boletoService = new BoletoService();
    const csvFile = {
        fieldname: 'file',
        originalname: 'boletos.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        buffer: Buffer.from('nome,unidade,valor,linha_digitavel\nJOSE DA SILVA,17,182.54,123456123456123456\nMARCOS ROBERTO,18,178.20,123456123456123456\nMARCIA CARVALHO,19,128.00,123456123456123456\n'),
        size: 106
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

            const boleto = await boletoService.boletoCSV(csvFile as Express.Multer.File)
            console.log(boleto)

            expect(boleto).toEqual([]);

        });

        it('should throw an error when lotes are not found', async () => {


            await expect(boletoService.boletoCSV(csvFile as Express.Multer.File)).rejects.toThrow(JSON.stringify(boletosFormat));
        });
    });
})


