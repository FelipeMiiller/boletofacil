
import fs from "fs"
import { PDFDocument } from "pdf-lib";
import HttpException from "./exceptions/HttpExceptions";
import { ILote } from "../modules/lote/domain/repository/lote.repository";
import path from 'path';




export async function splitPDFPages(data: Express.Multer.File, lotes: ILote[]): Promise<string> {
  const pathDoc = data.path
  const rootPath = path.join(__dirname, '../../');
  const buffer = fs.readFileSync(pathDoc);
  const pdfDoc = await PDFDocument.load(buffer);


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
      const outputPath = path.join(outputFilePath, `${i + 1}.pdf`);
      const pdfBytes = await newPdfDoc.save();

      fs.writeFileSync(outputPath, pdfBytes);

    }
    return 'Arquivos PDF separados com sucesso!';
  }

  catch (error) {
    throw new HttpException("Failed to read pdf !!!",);
  } finally {

    fs.unlinkSync(pathDoc)
  }

}