import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { IChat } from 'src/app/interfaces/chat.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'heyyo-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newMessage = '';
  isProcessing: boolean;
  me: IUser;
  receiver: IUser;
  receiverUsename: string;
  chat: IChat;
  chatList = [
    {
      img_url: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      message: 'Hi, how are you samim?',
      time: '8:40 AM, Today',
      me: false
    },
    {
      img_url: 'https://randomuser.me/api/portraits/men/41.jpg',
      message: 'Hi Khalid i am good tnx how about you?',
      time: '8:55 AM, Today',
      me: true
    },
    {
      img_url: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      message: 'I am good too, thank you for your chat template',
      time: '9:00 AM, Today',
      me: false
    }
  ];
  userId = '';

  constructor(
    private wsService: WebSocketService,
    private userService: UserService,
    private chatService: ChatService,
    private route: ActivatedRoute) {
    this.route.params.pipe(take(1)).subscribe(val => this.receiverUsename = val.username);
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isProcessing = true;
    this.getMyDetails();
    this.getReceiverDetails();
    this.listenToSocket();
  }

  listenToSocket(): void {
    this.wsService.listen$('pageRefresh').subscribe(() => {
      this.getMessages(this.receiver._id);
    });
  }
  getMyDetails(): void {
    this.userService.getMyDetails().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.me = response.Results[0];
      } else {
        this.isProcessing = false;
        if (response.ErrorMessage) {
          console.log('response failure', response.ErrorMessage);
        }
      }
    }, (err: any) => {
      this.isProcessing = false;
      if (err.error.ErrorMessage) {
        console.log('catch error', err.error.ErrorMessage);
      }
    });
  }

  getReceiverDetails(): void {
    this.userService.getUserByUsername(this.receiverUsename).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.receiver = response.Results[0];
        console.log(this.receiver);
        this.getMessages(this.receiver._id);
      } else {
        this.isProcessing = false;
        if (response.ErrorMessage) {
          console.log('response failure', response.ErrorMessage);
        }
      }
    }, (err: any) => {
      this.isProcessing = false;
      if (err.error.ErrorMessage) {
        console.log('catch error', err.error.ErrorMessage);
      }
    });
  }

  onSendMessage(): void {
    if (this.newMessage) {
      const data = {
        receiverName: this.receiver.username,
        message: this.newMessage
      };
      console.log(this.receiver._id);
      this.chatService.senNewMessage(this.receiver._id, data).subscribe(response => {
        if (response.Success) {
          this.wsService.sendMessage('refreshData', {});
          this.newMessage = '';
        } else {
          if (response.ErrorMessage) {
            console.log('response failure', response.ErrorMessage);
          }
        }
      }, (err: any) => {
        if (err.error.ErrorMessage) {
          console.log('catch error', err.error.ErrorMessage);
        }
      });
    }
  }

  getMessages(receiverId: string): void {
    this.chatService.getMessages(receiverId).subscribe(response => {
      if (response.Success) {
        console.log(response.Results[0]);
        this.chat = response.Results[0];
      } else {
        if (response.ErrorMessage) {
          console.log('response failure', response.ErrorMessage);
        }
      }
    }, (err: any) => {
      if (err.error.ErrorMessage) {
        console.log('catch error', err.error.ErrorMessage);
      }
    });
  }

  enterButtonPressed(): void {

  }

  getFormatedDate(dateValue: Date): string {
    return moment(dateValue).fromNow();
  }
}
