import { Content, TDocumentDefinitions, Table } from "pdfmake/interfaces";
import { IBoleto } from "../modules/boleto/domain/repository/boleto.repository";
import HttpException from "./exceptions/HttpExceptions";
import fs from "fs";
import PdfPrinter from "pdfmake";



 
export async function generateBoletosReport(boletos: IBoleto[]): Promise<string> {
    try {
     
  
      const fonts = {
        Helvetica: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalics: "Helvetica-BoldOblique"
        }
      };
  
      const printer = new PdfPrinter(fonts);
  
      boletos.forEach((boleto, index) => {
        const table: Table = {
          headerRows: 1,
          widths: [40, "*", 40, 60, "*"],
          body: [
            ["id", "nome_sacado", "id_lote", "valor", "linha_digitavel"],
            [
              boleto.id.toString(),
              boleto.nome_sacado,
              boleto.id_lote.toString(),
              boleto.valor.toFixed(2),
              boleto.linha_digitavel
            ]
          ]
        };
  
        const documentDefinition: TDocumentDefinitions = {
          content: [{ table }],
          defaultStyle: {
            font: "Helvetica"
          },
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: "center",
              marginBottom: 10
            }
          }
        };
  
        const pdfDoc = printer.createPdfKitDocument(documentDefinition);
  
        let chunks: any[] = [];
        pdfDoc.on("data", chunk => {
          chunks.push(chunk);
        });
  
        pdfDoc.on("end", () => {
          const buffer = Buffer.concat(chunks);
  
         
  
          // Ou, se você quiser retornar a base64 de cada página:
          // const base64 = buffer.toString("base64");
          // console.log(base64);
        });
  
        pdfDoc.end();
      });
  
      return "Páginas do PDF criadas com sucesso!";
    } catch (error) {
      throw new HttpException("Error in generateBoletosReport");
    }
  }