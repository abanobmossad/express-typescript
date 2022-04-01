import { NextFunction, Request, Response } from 'express';
import { isMongoId } from 'class-validator';
import { isEqual, omit } from 'lodash';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto/users.dto';
import { HttpException } from '@common/exceptions';
import { User, UserWithoutPass } from '@modules/users/interfaces/users.interface';
import { UserService } from '@modules/users/users.service';
import { RequestWithUser } from '../auth/interfaces/auth.interface';

export class UsersController {
  public userService = new UserService();

  public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public getUserByIdOrUsername = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;

      let user: User;
      if (isMongoId(userId)) {
        user = await this.userService.findUserById(userId);
      } else {
        user = await this.userService.findUserUsername(userId);
      }

      res.status(200).json(omit(user, 'password'));
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: UserWithoutPass = await this.userService.createUser(userData);

      res.status(201).json(omit(createUserData, 'password'));
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      if (!isEqual(userId, req.user._id.toString())) {
        return next(new HttpException(403, 'Dont have the permission to make this action'));
      }

      const userData: UpdateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      return res.status(200).json(omit(updateUserData, 'password'));
    } catch (error) {
      return next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      if (!isEqual(userId, req.user._id.toString())) {
        return next(new HttpException(403, 'Dont have the permission to make this action'));
      }

      const deleteUserData: User = await this.userService.deleteUser(userId);

      return res.status(200).json(omit(deleteUserData, 'password'));
    } catch (error) {
      return next(error);
    }
  };
}
