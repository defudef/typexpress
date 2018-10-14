import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();

import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

import Config from './config/Config';

import { json, urlencoded } from 'body-parser';

import { createConnection } from 'typeorm';
import { authorizationCheckerHandler, currentUserCheckerHandler } from './services/MiddlewareHandlerService';

const DEFAULT_PORT = 3100;

class App {
  app: express.Application;

  private readonly port: number;

  constructor() {
    this.port = (process.env.PORT) ? Number(process.env.PORT) : DEFAULT_PORT;
    this.init();
  }

  private init() {
    createConnection()
      .then(() => {
        this.initControllers();
        this.app.use(cors({ origin: process.env.FRONTEND_URL }));
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.listen();
      })
      .catch(err => console.error(err));
  }

  private initControllers() {
    this.app = createExpressServer({
      authorizationChecker: authorizationCheckerHandler,
      currentUserChecker: currentUserCheckerHandler,
      classTransformer: true,
      validation: true,
      controllers: Config.controllers
    });
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`Application is listening on port ${this.port}`);
    });
  }
}

export default new App().app;
