


import { BoletoController } from './modules/boleto/http/boleto.controller';
import Server from './server';
import 'dotenv/config'








const app = new Server([
    new BoletoController()

]);


app.start();
