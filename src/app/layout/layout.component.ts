import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Router } from '@angular/router';
import { TokenStoreService } from '../core/services';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './services/user.service';
import { TopNavComponent } from './com-parts';

@Component({
  selector: 'heyyo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  public newMessage: string;
  public loginInfo: IUser;
  public me: IUser;
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
  @ViewChild('topNav') topNav: TopNavComponent;


  constructor(
    private wsService: WebSocketService,
    private router: Router,
    private tsService: TokenStoreService,
    private userService: UserService
  ) {
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.geMyDetail();
    this.listenToSocket();
  }

  geMyDetail(): void {
    this.userService.getMyDetails().subscribe(response => {
      if (response.Success) {
        this.me = response.Results[0];
        this.topNav.user = this.me;
        this.topNav.checkIfRead(this.me.chats);
      } else {
        if (response.ErrorMessage) {
          console.log('response failure', response.ErrorMessage);
        }
      }
    }, (err: any) => {
      if (err.error.ErrorMessage) {
        console.log('catch error', err.error.ErrorMessage);
      }
    });
 }


  private listenToSocket(): void {

    // this.wsService.sendMessage('joinRoom', this.loginInfo);

    this.wsService.listen$('pageRefresh').subscribe(() => {
      this.geMyDetail();
    });
    // this.wsService.listen$('connected').subscribe(msg => {
    //   this.userId = msg.userId;
    //   this.messageList.push(msg);
    //   const container = this.messageArea.nativeElement;
    //   container.scrollTop = container.scrollHeight;
    // });
    // this.wsService.listen$('serverMessage').subscribe(msg => {
    //   const container = this.messageArea.nativeElement;
    //   this.messageList.push(msg);
    //   setTimeout(() => {
    //     container.scrollTop = container.scrollHeight;
    //   }, 200);
    // });

    // this.wsService.listen$('joined').subscribe(msg => {
    //   this.messageList.push(msg);
    //   const container = this.messageArea.nativeElement;
    //   container.scrollTop = container.scrollHeight;
    // });

    // this.wsService.listen$('roomData').subscribe(data => {
    //   this.roomData = data;
    // });

    // this.wsService.listen$('left').subscribe(msg => {
    //   console.log(msg);
    //   this.messageList.push(msg);
    //   setTimeout(() => {
    //     const container = this.messageArea.nativeElement;
    //     container.scrollTop = container.scrollHeight;
    //   }, 2000);
    // });
  }


  onLeaveChat(): void {
    this.wsService.sendMessage('disconnect');
    this.wsService.offSocket();
    localStorage.removeItem('loginInfo');
  }

  onLogoutButtonClicked(): void {
    this.tsService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.wsService.sendMessage('disconnect');
    this.router.navigate(['/']);
    // localStorage.removeItem('loginInfo');
  }
}
