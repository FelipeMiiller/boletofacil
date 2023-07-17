import { body, query, validationResult} from 'express-validator';

export const createLoteSchema = [

  body('nome').notEmpty().isString().withMessage('Provide valid nome.'),
  body('id_externo').notEmpty().isNumeric().withMessage('Provide valid id_externo.'),
  body('ativo').isBoolean().withMessage('Provide valid ativo.'),
];




export const createManyLotesSchema = [

  body()
    .isArray()
    .withMessage('Provide valid array of lotes.')
    .custom((value) => {
      for (const lote of value) {
        const errors = validationResult(createLoteSchema);
        if (!errors.isEmpty()) {
          throw new Error('Invalid lote object.');
        }
      }
      return true;
    })

]




export const relatorioShema = [
  query('relatorio').equals('1').withMessage('O valor do parâmetro esta incorreto.')]