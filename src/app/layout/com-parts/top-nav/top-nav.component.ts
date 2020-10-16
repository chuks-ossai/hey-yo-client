import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { IChat } from 'src/app/interfaces/chat.interface';
import { IMessage } from 'src/app/interfaces/message.interface';
import { INotification } from 'src/app/interfaces/notification.interface';
import { IUser } from '../../../interfaces/user.interface';
import * as _ from 'lodash';

@Component({
  selector: 'heyyo-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  numberOfMessage = 0;
  @Output() logout = new EventEmitter();
  @Input() user: IUser;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onLogoutButtonClicked(): void {
    this.logout.emit();
  }

  getUnreadNotifications(): INotification[] {
    if (this.user) {
      return this.user.notifications.filter(v => v.read === false).reverse();
    }
    return [];
  }

  getLastMessage(chat: any): IMessage {
    if (this.user) {
      let v = null;
      const msg = chat.message.messages[chat.message.messages.length - 1];
      if (msg.receiver === this.user._id) {
        v = msg;
      }
      return v;
    }
    return null;
  }

  formatDate(date: Date): string {
    return moment(date).calendar(null, {
      sameDay: '[Today at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  }

  checkIfRead(arr: any[]): void {
    const arrCheck = [];
    arr.forEach(msg => {
      console.log(msg);
      const receiverLastMsg = msg.message.messages[msg.message.messages.length - 1];
      console.log(receiverLastMsg);
      if (this.route.url !== `/d/chat/${msg.message.senderName}`) {
        console.log('receiver id', receiverLastMsg.receiver);
        console.log('user id', this.user._id);
        if (!receiverLastMsg.isRead && receiverLastMsg.receiver === this.user._id) {
          console.log('is true')
          arrCheck.push(1);
          this.numberOfMessage = _.sum(arrCheck);
        }
      }
    });
  }
}
