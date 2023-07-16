import { Content, TDocumentDefinitions, Table } from "pdfmake/interfaces";
import { IBoleto } from "../modules/boleto/domain/repository/boleto.repository";
import HttpException from "./exceptions/HttpExceptions";

import PdfPrinter from "pdfmake";


export async function generateBoletos(boletos: IBoleto[]): Promise<Buffer> {

  try {
    const content: Content = [];



    for (const boleto of boletos) {
      content.push({ text: boleto.nome_sacado, fontSize: 18, bold: true });

      content.push({
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['id', 'nome_sacado', 'id_lote', 'valor', 'linha_digitavel'],
            [
              boleto.id.toString(),
              boleto.nome_sacado,
              boleto.id_lote.toString(),
              boleto.valor.toFixed(2),
              boleto.linha_digitavel,
            ],
          ],
        },
        pageBreak: 'after' 
      });
    }

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
      }


    }

    const printer = new PdfPrinter(fonts)


    const docDefinition: TDocumentDefinitions = {
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

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    let chunks: any[] = []
    pdfDoc.on("data", (chunck) => {
      chunks.push(chunck)
    })



    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      pdfDoc.end();
    });
  } catch (error) {
    throw new HttpException("Error in generateBoletosReport",);

  }
}