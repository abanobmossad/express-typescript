import { IsNumber, IsString } from 'class-validator';

export class UserBuyDto {
  @IsString()
  public productId: string;
  @IsNumber()
  public amount: number;
}
