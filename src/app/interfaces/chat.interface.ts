import { IMessage } from './message.interface';

export interface IChat {
  conversation: string;
  createdAt: Date;
  messages: IMessage[];
  receiverName: string;
  senderName: string;
  updatedAt: Date;
  _id: string;
}
