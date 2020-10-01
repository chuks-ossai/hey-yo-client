import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { UserService } from '../../services/user.service';
import _ from 'lodash';

@Component({
  selector: 'heyyo-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

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
    this.wsService.listen$('followingRefreshed').subscribe(() => {
      this.getMyDetails();
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

  onFollowClicked(userId: string): void {
    this.userService.followUser(userId, true).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results);
        this.wsService.sendMessage('refreshFollowing', {});
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

  usernameExist(arr: any[]): boolean {
    return _.some(arr, { username: this.me.username });
  }

  onChatClicked(user: IUser): void {
    console.log(user);
  }

}
