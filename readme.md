# Projeto BoletoFacil

## Importador de Arquivos CSV e Gerador de Relatórios de Boletos

O BoletoFacil é um projeto que permite importar arquivos CSV contendo informações de boletos e realizar o processamento desses dados para armazená-los em um banco de dados. Além disso, o projeto oferece a funcionalidade de gerar relatórios em formato PDF com os boletos cadastrados.

### Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- Prisma (ORM)
- Jest (Framework de Testes)
- PDFMake (Geração de PDFs)
- Outras dependências (consulte o arquivo package.json para obter a lista completa)



### Instalação

1- Isntale as dependencias
npm install

2- Configure as variáveis de ambiente necessárias. Consulte o arquivo .env.example para ver a lista de variáveis necessárias e defina-as em um arquivo .env na raiz do projeto.

3- Execute as migrações do banco de dados:

npx prisma migrate dev --name initial

4- Inicie o servidor de desenvolvimento:
npm run dev


### Rotas

A seguir estão as rotas disponíveis neste projeto:

  

#### `POST /boletos/csv`

import boletos em csv para o banco de dados,solicitação HTTP Multipart =csv.

#### `POST /boletos/pdf`

import pdf com boletos e separa por ordem predefinida,solicitação HTTP Multipart =csv.


#### `GET /boletos/:relatorio=1`

Gere um relatorio de boletos 

#### `GET /boletos/boletos`

Gere um pdf com os boletos separados por pagina e ordenados pela ordem definida na tabela lotes

#### `POST /lotes`

Cria lote

#### `POST /lotes/mary`

Cria lotes



### Arquivos 

Na pasta test/mocks , tem alguns arquivos para test
