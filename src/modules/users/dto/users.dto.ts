/* eslint-disable max-classes-per-file */
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

class UserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_.]+$/, { message: 'Invalid username' })
  public username: string;

  @IsString()
  public password: string;
}

export class CreateUserDto extends UserDto {
  @IsOptional()
  @IsString()
  @IsEnum(['buyer', 'seller'], { message: `Role must be "buyer" OR "seller"` })
  public role?: 'buyer' | 'seller';
}

export class UpdateUserDto extends UserDto {}
