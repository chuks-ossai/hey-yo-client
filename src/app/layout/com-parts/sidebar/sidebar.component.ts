import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'heyyo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() user: any;
  @Input() data: any;

  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLogoutButtonClicked(): void {
    this.logout.emit();
  }

  scanBarcode(): void {
    console.log('popup modal for scanning app barcode');
  }
}
