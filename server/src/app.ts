import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Controller from "events/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
  public getServer() {
    return this.app;
  }
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  private connectToTheDatabase() {
    const { MONGO_PATH } = process.env;
    mongoose.connect(`${MONGO_PATH}`);
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
