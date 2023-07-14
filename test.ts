import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/import', upload.single('file'), async (req:, res) => {
  const { path: csvFilePath } = req.file;

  const boletos = [];
  await new Promise<void>((resolve, reject) => {
    const stream = csvParser({ separator: ';' });
    stream.on('data', (data) => {
      boletos.push(data);
    });
    stream.on('error', reject);
    stream.on('end', resolve);

    fs.createReadStream(csvFilePath).pipe(stream);
  });

  for (const boletoData of boletos) {
    const { nome, unidade, valor, linha_digitavel } = boletoData;

    const lote = await prisma.lotes.findUnique({ where: { nome: unidade } });

    if (lote) {
      await prisma.boletos.create({
        data: {
          nome_sacado: nome,
          valor: parseFloat(valor),
          linha_digitavel,
          lote: { connect: { id: lote.id } },
        },
      });
    }
  }

  res.send('Boletos imported successfully!');
});

app.post('/import/pdf', upload.single('file'), async (req, res) => {
  // Process the PDF file
  // ...

  res.send('PDF imported successfully!');
});

app.get('/boletos', async (req, res) => {
  const { nome, valor_inicial, valor_final, id_lote } = req.query;

  const whereClause = {};
  if (nome) {
    whereClause.nome_sacado = { contains: nome };
  }
  if (valor_inicial && valor_final) {
    whereClause.valor = { gte: parseFloat(valor_inicial), lte: parseFloat(valor_final) };
  }
  if (id_lote) {
    whereClause.loteId = parseInt(id_lote, 10);
  }

  const boletos = await prisma.boletos.findMany({
    where: whereClause,
    include: { lote: true },
  });

  res.json(boletos);
});

app.get('/boletos/relatorio', async (req, res) => {
  // Generate the PDF report
  // ...

  res.send('PDF report generated successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
