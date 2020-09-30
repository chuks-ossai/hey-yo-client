import { IUser } from './user.interface';

export interface IPost {
  title: string;
  comments: any[];
  createdAt: string;
  likes: any[];
  totalLikes: number;
  updatedAt: string;
  user: IUser;
  content: string;
  _id: string;
}
