import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INotification } from 'src/app/interfaces/notification.interface';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'heyyo-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() logout = new EventEmitter();
  @Input() user: IUser;

  constructor() { }

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
}
