import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'heyyo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() showButton = true;
  @Input() buttonText: string;
  @Input() icon = 'fa-plus';

  @Output() buttonClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClicked(): void {
    this.buttonClicked.emit();
  }

}
