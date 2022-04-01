import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AUTH_SECRET_KEY } from '@config';
import { CreateUserDto } from '@modules/users/dto/users.dto';
import { HttpException } from '@common/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@modules/auth/interfaces/auth.interface';
import { User } from '@modules/users/interfaces/users.interface';
import userModel from '@modules/users/user.model';
import { isEmpty } from '@utils/helpers';

export class AuthService {
  public users = userModel;

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User; tokenData: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ username: userData.username }, { password: 1 }).lean();
    if (!findUser) throw new HttpException(404, `You're username "${userData.username}" not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ username: userData.username, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're username "${userData.username}" not found`);

    return findUser;
  }

  public createToken = (user: User): TokenData => {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = AUTH_SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  };

  public createCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  };
}
