export interface IMessage {
  body: string;
  isRead: boolean;
  receiver: string;
  sender: string;
  sentDate: Date;
  _id: string;
}
