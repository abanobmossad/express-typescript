import { hash } from 'bcrypt';
import { isEmpty } from '@utils/helpers';
import { HttpException } from '@common/exceptions/HttpException';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto/users.dto';
import { User } from '@modules/users/interfaces/users.interface';
import userModel from '@modules/users/user.model';

export class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    return this.users.find().lean();
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'No User ID');

    const findUser: User = await this.users.findOne({ _id: userId }).lean();
    if (!findUser) throw new HttpException(404, 'User Not Found');

    return findUser;
  }

  public async findUserUsername(username: string): Promise<User> {
    const findUser: User = await this.users.findOne({ username }).lean();
    if (!findUser) throw new HttpException(404, 'User Not Found');

    return findUser;
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    if (isEmpty(dto)) throw new HttpException(400, 'No User DTO');

    const findUser: User = await this.users.findOne({ username: dto.username });
    if (findUser) throw new HttpException(409, `You're username "${dto.username}" already exists`);

    const hashedPassword = await hash(dto.password, 10);
    const createUserData = await this.users.create({ ...dto, password: hashedPassword });

    return createUserData.toJSON();
  }

  public async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    if (isEmpty(dto)) throw new HttpException(400, 'No User DTO');

    if (dto.username) {
      const findUser: User = await this.users.findOne({ username: dto.username });
      if (findUser && findUser._id.toString() !== userId.toString()) {
        throw new HttpException(409, `You're username "${dto.username}" already exists`);
      }
    }

    if (dto.password) {
      const hashedPassword = await hash(dto.password, 10);
      dto = { ...dto, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, dto, { new: true }).lean();
    if (!updateUserById) throw new HttpException(404, 'User Not Found');

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId).lean();
    if (!deleteUserById) throw new HttpException(404, 'User Not Found');

    return deleteUserById;
  }
}
