import PdfPrinter from "pdfmake";
import { IBoleto } from "../modules/boleto/domain/repository/boleto.repository";
import { Content, TDocumentDefinitions, Table } from "pdfmake/interfaces"
import HttpException from "./exceptions/HttpExceptions";












export async function generateBoletosReport(boletos: IBoleto[]): Promise<Buffer> {
    try {
        const content: Content = [];

        const table: Table = {
            headerRows: 1,
            widths: [40, '*', 40, 60, '*'],
        
            body: [
                ['id', 'nome_sacado', 'id_lote', 'valor', 'linha_digitavel'],
                ...boletos.map((boleto) => [
                    boleto.id.toString(),
                    boleto.nome_sacado,
                    boleto.id_lote.toString(),
                    boleto.valor.toFixed(2),
                    boleto.linha_digitavel
                ]),
            ],


        }

        content.push({ table })
        const fonts = {
            Helvetica: {
                normal: "Helvetica",
                bold: "Helvetica-Bold",
                italics: "Helvetica-Oblique",
                bolditalics: "Helvetica-BoldOblique"
            }


        }

        const printer = new PdfPrinter(fonts)

        // Cria o documento PDF
        const documentDefinition: TDocumentDefinitions = {
            content,
            defaultStyle: {
                font: "Helvetica",

            },
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    marginBottom: 10
                }
            }
        };
        const pdfDoc = printer.createPdfKitDocument(documentDefinition);


        let chunks: any[] = []
        pdfDoc.on("data", (chunck) => {
            chunks.push(chunck)
        })

     
      
          
    

        return new Promise<Buffer>((resolve, reject) => {
            pdfDoc.on("end", () => {
                const buffer = Buffer.concat(chunks);
            
                resolve(buffer );
            });

            pdfDoc.end();
        });
    } catch (error) {
        throw new HttpException("Error in generateBoletosReport",);

    }
}