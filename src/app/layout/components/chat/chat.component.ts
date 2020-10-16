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
  userId = '';
  typing = false;
  typingMsg: any;

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

  joinChat(): void {
    this.wsService.sendMessage('joinChat', {
      sender: this.me.username,
      receiver: this.receiverUsename
    });
  }

  listenToSocket(): void {
    this.wsService.listen$('pageRefresh').subscribe(() => {
      this.getMessages(this.receiver._id);
    });

    this.wsService.listen$('senderTyping').subscribe(data => {
      if (data.sender === this.receiverUsename) {
        this.typing = true;
      }
    });

    this.wsService.listen$('senderStoppedTyping').subscribe(data => {
      if (data.sender === this.receiverUsename) {
        this.typing = false;
      }
    });
  }

  getMyDetails(): void {
    this.userService.getMyDetails().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.me = response.Results[0];
        this.joinChat();
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
    if (this.newMessage.trim()) {
      const data = {
        receiverName: this.receiver.username,
        message: this.newMessage.trim()
      };
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
        this.chat = response.Results[0];
        this.typing = false;
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

  onEnterKeyPressed(event): void {
    if (event.keyCode === 13) {
      this.onSendMessage();
    } else {
      this.wsService.sendMessage('typing', {
        sender: this.me.username,
        receiver: this.receiverUsename
      });

      if (this.typingMsg) {
        clearTimeout(this.typingMsg);
      }

      this.typingMsg = setTimeout(() => {
        this.wsService.sendMessage('stopTyping', {
          sender: this.me.username,
          receiver: this.receiverUsename
        });
      }, 4000);
    }
  }

  getFormatedDate(dateValue: Date): string {
    return moment(dateValue).fromNow();
  }
}
