import { INotification } from './notification.interface';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  following: IUser[];
  followers: IUser[];
  notifications: INotification[];
  _id: string;
  createAt: Date;
  updatedAt: Date;
}
