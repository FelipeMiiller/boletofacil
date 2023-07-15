


import { BoletoController } from './modules/boleto/http/boleto.controller';
import { LoteController } from './modules/lote/http/lote.controller';
import Server from './server';
import 'dotenv/config'








const app = new Server([
    new BoletoController(),
    new LoteController()

]);


app.start();
