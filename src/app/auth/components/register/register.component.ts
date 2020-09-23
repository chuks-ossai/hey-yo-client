import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterService } from '../../services';

@Component({
  selector: 'heyyo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public service: RegisterService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.service.valid) {
      this.authService.registerUser(this.service.value).subscribe(response => {
        if (response.Success) {
          console.log(response.Results[0]);
          this.service.f.reset();
        } else {
          console.log('response erro message', response.ErrorMessage);
        }
      }, err => {
          console.log(err.error.ErrorMessage);
      });
    } else {
      console.log('form not valid');
    }
  }
}
