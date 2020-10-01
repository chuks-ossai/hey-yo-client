import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/layout/services/user.service';
import _ from 'lodash';
import { TokenStoreService } from 'src/app/core/services';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'heyyo-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  isProcessing = false;
  users: IUser[];
  me: IUser;

  constructor(private userService: UserService, private tokenService: TokenStoreService, private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.me = this.tokenService.getUserPayload();
    this.getUsers();
    this.listenToSocket();
  }

  listenToSocket(): void {
    this.wsService.listen$('peopleRefresh').subscribe(() => {
      this.getUsers();
    });
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.users = response.Results;
        console.log(this.users);
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

  onFollowClicked(userId: string, isLiked: boolean): void {
    this.userService.followUser(userId, isLiked).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results);
        this.wsService.sendMessage('refreshUsers', {});
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
