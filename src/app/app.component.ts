import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStoreService } from './core/services';

@Component({
  selector: 'heyyo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private tsService: TokenStoreService) { }

  ngOnInit(): void {
    this.autoNavigateLoggedinUser();
  }

  autoNavigateLoggedinUser(): void {
    if (this.tsService.getToken()) {
      this.router.navigate(['d/streams']);
    }
  }
}
