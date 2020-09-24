import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Router } from '@angular/router';
import { TokenStoreService } from '../core/services';

@Component({
  selector: 'heyyo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  public newMessage: string;
  public loginInfo: any;
  public userId: string;
  public messageList: any[] = [];
  public roomData: any;
  itemsCount = {
    streams: 2,
    people: 5,
    following: 3,
    followers: 0,
    photos: 1
  };

  @ViewChild('messageArea') messageArea: ElementRef;
  @ViewChild('msgInput') msgInput: ElementRef;
  @ViewChild('list') listObj: any;


  constructor(private wsService: WebSocketService, private router: Router, private tsService: TokenStoreService) {
    this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
   }

  ngOnInit(): void {
    // this.listenToSocket();
  }

  private listenToSocket(): void {

    this.wsService.sendMessage('joinRoom', this.loginInfo);

    this.wsService.listen$('connected').subscribe(msg => {
      this.userId = msg.userId;
      this.messageList.push(msg);
      const container = this.messageArea.nativeElement;
      container.scrollTop = container.scrollHeight;
    });
    this.wsService.listen$('serverMessage').subscribe(msg => {
      const container = this.messageArea.nativeElement;
      this.messageList.push(msg);
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 200);
    });

    this.wsService.listen$('joined').subscribe(msg => {
      this.messageList.push(msg);
      const container = this.messageArea.nativeElement;
      container.scrollTop = container.scrollHeight;
    });

    this.wsService.listen$('roomData').subscribe(data => {
      this.roomData = data;
    });

    this.wsService.listen$('left').subscribe(msg => {
      console.log(msg);
      this.messageList.push(msg);
      setTimeout(() => {
        const container = this.messageArea.nativeElement;
        container.scrollTop = container.scrollHeight;
      }, 2000);
    });
  }

  sendMessage(): void {
    this.wsService.sendMessage('newMessage', this.newMessage);
    this.newMessage = '';
    this.msgInput.nativeElement.focus();
    const container = this.messageArea.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  enterButtonPressed($event: any): any {
    let pressed;
    if (this.newMessage) {
      pressed = $event.keyCode === 13 && this.sendMessage();
      if (pressed) {
        const container = this.messageArea.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }
    return pressed;
  }

  onLeaveChat(): void {
    this.wsService.sendMessage('disconnect');
    this.wsService.offSocket();
    localStorage.removeItem('loginInfo');
  }

  onLogoutButtonClicked(): void {
    this.tsService.removeToken();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.wsService.sendMessage('disconnect');
    this.router.navigate(['/']);
    // localStorage.removeItem('loginInfo');
  }
}
