import { Router } from 'express';
import { IndexController } from '@controllers/index.controller';
import { Routes } from '@common/interfaces/routes.interface';

export class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.router.get(`/`, this.indexController.index);
  }
}
