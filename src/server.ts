import express from 'express';
import  'dotenv';
import Controller from './common/interfaces/controller.interface';
import errorMiddleware from './middleware/errorMiddleware';







export default class Server {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeSetup()
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

  }


  private initializeSetup() {

    //this.app.use(cors());
    this.app.use(express.json());


  }
  private initializeMiddlewares() {



  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    ([...controllers]).forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }



  public getApp() {
    return this.app;
  }

  public start() {
    this.app.listen(process.env.PORT|| 3000, () => {
      console.log(`Server is running in port: ${process.env.PORT|| 3000}`);
    });
  }
}
