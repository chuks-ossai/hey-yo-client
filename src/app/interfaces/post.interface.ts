import { IUser } from './user.interface';

export interface IPost {
  comments: any[];
  createdAt: string;
  likes: any[];
  totalLikes: number;
  updatedAt: string;
  user: IUser;
  content: string;
  _id: string;
}
