export interface User {
  _id: string;
  username: string;
  password: string;
  deposit: number;
  role: 'buyer' | 'seller';
}

export type UserWithoutPass = Omit<User, 'password'>;
