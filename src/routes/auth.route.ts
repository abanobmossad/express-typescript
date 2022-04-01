import { Router } from 'express';
import { AuthController } from '@modules/auth/auth.controller';
import { CreateUserDto } from '@modules/users/dto/users.dto';
import { Routes } from '@common/interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware(), this.authController.logOut);
  }
}
