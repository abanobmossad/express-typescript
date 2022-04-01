import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect } from 'mongoose';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@common/interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import path from 'path';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`------- ENV: ${this.env} -------`);
      logger.info(`🚀 App listening on the port "${this.port}"`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase = () => {
    connect(dbConnection.url, dbConnection.options, err => {
      if (err) logger.error(`MongoDB not connected${err.message}`);
      else logger.info('MongoDB connected successfully');
    });
  };

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    this.app.use('/api-docs', express.static(path.join(process.cwd(), 'docs')));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
