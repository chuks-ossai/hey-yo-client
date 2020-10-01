import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { UserService } from '../../services/user.service';
import _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'heyyo-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  isProcessing: boolean;
  me: IUser;

  constructor(private wsService: WebSocketService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isProcessing = true;
    this.getMyDetails();
    this.listenToSocket();
  }

  listenToSocket(): void {
    this.wsService.listen$('pageRefresh').subscribe(() => {
      this.getMyDetails();
    });
  }
  getMyDetails(): void {
    this.userService.getMyDetails().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.me = response.Results[0];
        console.log(this.me);
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

  onFollowClicked(userId: string, isFollowing: boolean): void {
    this.userService.followUser(userId, isFollowing).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results);
        this.wsService.sendMessage('refreshData', {});
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

  amFollowing(arr: any[]): boolean {
    return !!arr.find(id => id === this.me._id);
  }

  formatDate(value: string): any {
    return moment(value).fromNow();
  }

  onMarkClicked(notificationId: string): void {
    this.userService.markAsRead(notificationId).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results);
        this.wsService.sendMessage('refreshData', {});
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

  onDeleteClicked(notificationId: string): void {
    this.userService.deleteNotification(notificationId).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results);
        this.wsService.sendMessage('refreshData', {});
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
}
