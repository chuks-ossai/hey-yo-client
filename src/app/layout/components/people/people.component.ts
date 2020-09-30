import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/layout/services/user.service';

@Component({
  selector: 'heyyo-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  isProcessing = false;
  users: IUser[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
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

  onFollowClicked(user: IUser): void {
    console.log(user);
  }

  onChatClicked(user: IUser): void {
    console.log(user);
  }
}
