export interface IMessage {
  body: string;
  isRead: boolean;
  receiver: string;
  sender: string;
  sentDate: Date;
  senderName: string;
  _id: string;
}
