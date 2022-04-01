import { Router } from 'express';
import { UsersController } from '@modules/users/users.controller';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto/users.dto';
import { Routes } from '@common/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.router.get(`${this.path}`, authMiddleware(), this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware(), this.usersController.getUserByIdOrUsername);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, authMiddleware(), validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware(), this.usersController.deleteUser);
  }
}
