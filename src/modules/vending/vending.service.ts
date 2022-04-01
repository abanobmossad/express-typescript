import { HttpException } from '@common/exceptions';
import userModel from '@modules/users/user.model';
import productModel from '../products/product.model';
import { User } from '../users/interfaces/users.interface';
import { UserBuyDto } from './dto/buy.dto';
import { UserDepositDto } from './dto/deposit.dto';
import { BuyingResponse } from './interfaces/buy-response.interface';
import { DepositResponse } from './interfaces/deposit-response.interface';

export class VendingService {
  public users = userModel;
  public products = productModel;

  public async depositUser(userId: string, dto: UserDepositDto): Promise<DepositResponse> {
    return this.users
      .findOneAndUpdate({ _id: userId }, { $inc: { deposit: dto.coins } }, { new: true })
      .exec()
      .then(res => {
        return {
          coins: dto.coins,
          deposit: res.deposit,
        };
      })
      .catch(() => {
        throw new HttpException(500, 'Error deposit your coins');
      });
  }

  public async buy(userId: string, dto: UserBuyDto): Promise<BuyingResponse> {
    const purchasedProduct = await this.products.findById(dto.productId).lean();
    if (!purchasedProduct) throw new HttpException(404, 'Product Not Found');

    const { deposit } = await this.users.findById(userId).lean();
    const { cost, amountAvailable, productName } = purchasedProduct;
    const totalCost = cost * dto.amount;

    if (amountAvailable < dto.amount) {
      throw new HttpException(400, `No available amount for "${productName}" product, Available ${amountAvailable} ,Please try later`);
    }

    if (deposit < totalCost) {
      throw new HttpException(
        406,
        `Please deposit at least ${totalCost} coin, Purchased Product cost is ${cost}, Your deposit is ${deposit}, Cant process`,
      );
    }

    // reduce product available amount
    await this.products.findByIdAndUpdate(purchasedProduct._id, { $inc: { amountAvailable: dto.amount * -1 } }, { new: true });
    // reset user deposit
    await this.resetUserDeposit(userId);

    return { totalSpend: totalCost, change: deposit - totalCost };
  }

  public async resetUserDeposit(userId: string): Promise<User> {
    return this.users.findOneAndUpdate({ _id: userId }, { deposit: 0 }, { new: true });
  }
}
