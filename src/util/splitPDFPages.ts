
import fs from "fs"
import { PDFDocument } from "pdf-lib";
import HttpException from "./exceptions/HttpExceptions";
import { IBoleto } from "../modules/boleto/domain/repository/boleto.repository";
import { ILote } from "../modules/lote/domain/repository/lote.repository";




export async function splitPDFPages(data: Express.Multer.File, lotes: ILote[]): Promise<string> {
  try {

    const outputFolderPath = 'boletos';

    const pdfDoc = await PDFDocument.load(data.buffer);
    console.log(pdfDoc.getAuthor);
    console.log(pdfDoc.getPages);


    for (let i = 0; i < pdfDoc.getPages().length; i++) {
      const page = pdfDoc.getPages()[i];
         

      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);


      const outputFilePath = `${outputFolderPath}/${lotes[i].id}.pdf`;


      const pdfBytes = await newPdfDoc.save();
      fs.writeFileSync(outputFilePath, pdfBytes);

     
    }
    return 'Arquivos PDF separados com sucesso!';
  }

  catch (error) {
    throw new HttpException('Failed order pdf,unknown error !!!');
  }


}