import UserStatus from '../enums/UserStatus';

export interface IUser {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  status: UserStatus;
}
