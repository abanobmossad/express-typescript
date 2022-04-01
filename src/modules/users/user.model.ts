import { model, Schema, Document } from 'mongoose';
import { User } from '@modules/users/interfaces/users.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  deposit: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer',
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
