import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'heyyo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public username = '';
  public room = '';

  constructor(private router: Router, private wsService: WebSocketService) { }

  ngOnInit(): void {
    console.log('should disconnect here');
    this.wsService.sendMessage('disconnect');
    this.wsService.offSocket();
  }

  joinRoom(): void {
    const loginFormValue = { email: this.email, username: this.username, room: this.room };
    localStorage.setItem('loginInfo', JSON.stringify(loginFormValue));
    this.router.navigate(['chat']);
  }

}
