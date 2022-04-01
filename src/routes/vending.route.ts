import { Router } from 'express';
import { Routes } from '@common/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import { VendingController } from '@modules/vending/vending.controller';
import { UserDepositDto } from '@modules/vending/dto/deposit.dto';
import { UserBuyDto } from '@modules/vending/dto/buy.dto';

export class VendingRoute implements Routes {
  public path = '/v';
  public router = Router();
  public vendingController = new VendingController();

  constructor() {
    this.router.post(
      `${this.path}/deposit`,
      authMiddleware('buyer'),
      validationMiddleware(UserDepositDto, 'body'),
      this.vendingController.buyerDeposit,
    );

    this.router.post(`${this.path}/buy`, authMiddleware('buyer'), validationMiddleware(UserBuyDto, 'body'), this.vendingController.buyProducts);
    this.router.post(`${this.path}/reset`, authMiddleware('buyer'), this.vendingController.resetDeposit);
  }
}
