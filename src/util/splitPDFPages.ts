
import fs from "fs"
import { PDFDocument } from "pdf-lib";
import HttpException from "./exceptions/HttpExceptions";
import { ILote } from "../modules/lote/domain/repository/lote.repository";
import path from 'path';




export async function splitPDFPages(data: Express.Multer.File, lotes: ILote[]): Promise<string> {

  const rootPath = process.env.DIR_FILES || path.join(__dirname, '.././');

  const pdfDoc = await PDFDocument.load(data.buffer);


  try {
    for (let i = 0; i < pdfDoc.getPages().length; i++) {
      const page = pdfDoc.getPages()[i];


      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);

      const outputFilePath = `${rootPath}boletos/`;
      if (!fs.existsSync(outputFilePath)) {
        fs.mkdirSync(outputFilePath, { recursive: true });
      }
      const lote = lotes.find(x => x.ordem_pdf == i+1);
      console.log("lote", lote)
      console.log("page", i+1)

      const outputPath = path.join(outputFilePath, `${lote?.id  }.pdf`);
      const pdfBytes = await newPdfDoc.save();

      fs.writeFileSync(outputPath, pdfBytes);

    }
    return 'Arquivos PDF separados com sucesso!';
  }

  catch (error) {
    if (error instanceof Error) {
      throw new HttpException(error.message, "Error reading csv");
    }
    throw new HttpException(JSON.stringify(error), "Error reading csv");

  }
}