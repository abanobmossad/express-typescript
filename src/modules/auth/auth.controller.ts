import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@modules/users/dto/users.dto';
import { RequestWithUser } from '@modules/auth/interfaces/auth.interface';
import { AuthService } from '@modules/auth/auth.service';

export class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, tokenData } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logged-out' });
    } catch (error) {
      next(error);
    }
  };
}
