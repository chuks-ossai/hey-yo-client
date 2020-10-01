export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  following: IUser[];
  followers: IUser[];
  _id: string;
  createAt: Date;
  updatedAt: Date;
}
