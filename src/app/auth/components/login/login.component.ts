import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TokenStoreService } from 'src/app/core/services';
import { WebSocketService } from '../../../web-socket.service';
import { LoginService } from '../../services';

@Component({
  selector: 'heyyo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public username = '';
  public room = '';
  public errMessage: string;
  public isProcessing = false;

  constructor(
    private router: Router,
    private wsService: WebSocketService,
    private authService: AuthService,
    private tsService: TokenStoreService,
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
      this.isProcessing = true;
      this.authService.loginUser(this.service.value).subscribe(response => {
        if (response.Success) {
          console.log(response.Results[0]);
          this.tsService.storeToken(response.Results[0].token);
          this.isProcessing = false;
          this.service.f.reset();
          this.router.navigate(['d/streams']);
        } else {
          this.isProcessing = false;
          if (response.ErrorMessage) {
            this.errMessage = response.ErrorMessage;
          }
        }
      }, err => {
          this.isProcessing = false;
          if (err.error.ErrorMessage) {
          this.errMessage = err.error.ErrorMessage;
        }
      });
    }
  }

  onFocus(): void {
    this.errMessage = null;
  }
}
