import { IsNumber, IsEnum } from 'class-validator';

export class UserDepositDto {
  @IsNumber()
  @IsEnum([5, 10, 20, 50, 100], { message: `Vending machine should only accept 5, 10, 20, 50 and 100 cent coins` })
  public coins: number;
}
