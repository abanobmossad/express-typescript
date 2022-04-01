import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../auth/interfaces/auth.interface';
import { UserBuyDto } from './dto/buy.dto';
import { UserDepositDto } from './dto/deposit.dto';
import { VendingService } from './vending.service';

export class VendingController {
  public vendingService = new VendingService();

  public buyerDeposit = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id.toString();
      const dto: UserDepositDto = req.body;

      const response = await this.vendingService.depositUser(userId, dto);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public buyProducts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id.toString();
      const dto: UserBuyDto = req.body;

      const response = await this.vendingService.buy(userId, dto);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public resetDeposit = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id.toString();
      const response = await this.vendingService.resetUserDeposit(userId);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
