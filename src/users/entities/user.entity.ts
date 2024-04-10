import { Exclude } from 'class-transformer';
import { IUser } from '../interfacce/IUser.interface';
export class UserEntity implements IUser {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
