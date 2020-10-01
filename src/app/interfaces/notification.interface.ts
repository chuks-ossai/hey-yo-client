import { IUser } from './user.interface';

export interface INotification {
  _id: string;
  senderName: string;
  message: string;
  profileViewed: boolean;
  created: Date;
  read: boolean;
  data: string;
}
