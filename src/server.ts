import express, { NextFunction, Request, Response } from 'express';
import 'dotenv';
import Controller from './common/interfaces/controller.interface';









export default class Server {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeSetup()
    this.app.use( function (req, res, next) {
      console.log( req.params);

      console.log( req.query);
      next();
    });
    this.initializeControllers(controllers);


  }


  private initializeSetup() {

    //this.app.use(cors());
    this.app.use(express.json());


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
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running in port: ${process.env.PORT || 3000}`);
    });
  }
}
