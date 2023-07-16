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

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes (npm ou Yarn)

### Instalação

1. Clone o repositório do BoletoFacil para o seu ambiente local:

   git clone <URL_DO_REPOSITORIO>


Desculpe pela confusão. Aqui está o README com as informações que você solicitou:

markdown
Copy code
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

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes (npm ou Yarn)

### Instalação


npm install
Configure as variáveis de ambiente necessárias. Consulte o arquivo .env.example para ver a lista de variáveis necessárias e defina-as em um arquivo .env na raiz do projeto.

Execute as migrações do banco de dados:


npx prisma migrate dev --name initial


Inicie o servidor de desenvolvimento:

npm run dev