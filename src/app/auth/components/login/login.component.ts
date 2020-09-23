import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../web-socket.service';
import { AuthService, LoginService } from '../../services';

@Component({
  selector: 'heyyo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService, LoginService]
})
export class LoginComponent implements OnInit {

  public username = '';
  public room = '';

  constructor(
    private router: Router,
    private wsService: WebSocketService,
    private authService: AuthService,
    public service: LoginService) { }

  ngOnInit(): void {
    this.wsService.sendMessage('disconnect');
    this.wsService.offSocket();
  }

  joinRoom(): void {
    const loginFormValue = { username: this.username, room: this.room };
    localStorage.setItem('loginInfo', JSON.stringify(loginFormValue));
    this.router.navigate(['chat']);
  }

  onSubmit(): void {
    if (this.service.valid) {
      this.authService.loginUser(this.service.value).subscribe(response => {
        if (response.Success) {
          console.log(response.Results[0]);
          this.service.f.reset();
        } else {
          console.log(response.ErrorMessage);
        }
      }, err => console.error(err.error.ErrorMessage));
    }
  }

}
