import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AUTH_SECRET_KEY } from '@config';
import { HttpException } from '@common/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@modules/auth/interfaces/auth.interface';
import userModel from '@modules/users/user.model';

export default function authMiddleware(role?: 'buyer' | 'seller') {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies.Authorization || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

      if (!Authorization) return next(new HttpException(404, 'Authentication is required to access this API'));

      const secretKey: string = AUTH_SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (!findUser) return next(new HttpException(401, 'Wrong authentication token'));
      if (role && findUser.role !== role) return next(new HttpException(403, 'You dont have the permission to do this action'));

      req.user = findUser;
      return next();
    } catch (error) {
      return next(new HttpException(401, 'Wrong authentication token'));
    }
  };
}
