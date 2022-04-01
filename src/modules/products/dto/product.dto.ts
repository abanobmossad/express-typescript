import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public productName: string;

  @IsNumber()
  public amountAvailable: number;

  @IsNumber()
  public cost: number;

  public sellerId: string;
}
