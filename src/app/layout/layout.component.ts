import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'heyyo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.connectToSocket();
    this.joinedChat();
    this.left();
  }

  private connectToSocket(): void {
    this.wsService.listen$('connected').subscribe(data => {
      console.log(data);
    });
  }

  private joinedChat(): void {
    this.wsService.listen$('joined').subscribe(data => {
      console.log(data);
    });
  }

  private left(): void {
    this.wsService.listen$('left').subscribe(data => {
      console.log(data);
    });
  }
}
