import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'heyyo-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLogoutButtonClicked(): void {
    this.logout.emit();
  }
}
