import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../web-socket.service';

@Component({
  selector: 'heyyo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public room = '';

  constructor(private router: Router, private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.wsService.sendMessage('disconnect');
    this.wsService.offSocket();
  }

  joinRoom(): void {
    const loginFormValue = { username: this.username, room: this.room };
    localStorage.setItem('loginInfo', JSON.stringify(loginFormValue));
    this.router.navigate(['chat']);
  }

}
