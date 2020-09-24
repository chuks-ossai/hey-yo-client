import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { RegisterService } from '../../services';

@Component({
  selector: 'heyyo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  errMessage: string;
  public isProcessing = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public service: RegisterService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.service.valid) {
      this.isProcessing = true;
      this.authService.registerUser(this.service.value).subscribe(response => {
        if (response.Success) {
          this.service.f.reset();
          this.isProcessing = false;
          this.router.navigate(['/login']);
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
    } else {
      console.log('form not valid');
    }
  }

  onFocus(): void {
    this.errMessage = null;
  }
}
