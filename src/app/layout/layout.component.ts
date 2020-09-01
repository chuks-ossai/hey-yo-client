import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'heyyo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public newMessage: string;
  public myMessage: string;
  public otherMessage: string;
  public data: any[] = [
    {
      text: 'Jenifer',
      contact: 'Hi',
      id: '1',
      avatar: '',
      pic: 'pic01', chat: 'sender'
    },
    { text: 'Amenda', contact: 'Hello', id: '2', avatar: 'A', pic: '', chat: 'receiver' },
    {
      text: 'Jenifer',
      contact: 'What Knid of application going to launch',
      id: '4',
      avatar: '',
      pic: 'pic02', chat: 'sender'
    },
    {
      text: 'Amenda ',
      contact: 'A knid of Emergency broadcast App',
      id: '5',
      avatar: 'A',
      pic: '', chat: 'receiver'
    },
    {
      text: 'Jacob',
      contact: 'Can you please elaborate',
      id: '6',
      avatar: '',
      pic: 'pic04', chat: 'sender'
    },
  ];
  public messageList: any[] = [];
  @ViewChild('messages') messages: ElementRef;
  @ViewChild('list') listObj: any;

  constructor(private wsService: WebSocketService) { }

  ngOnInit(): void {
    this.connectToSocketAndGetMessage();
    this.joinedChat();
    this.left();
  }

  private connectToSocketAndGetMessage(): void {
    this.wsService.listen$('connected').subscribe(data => {
      console.log(data);
    });
    this.wsService.listen$('serverMessage').subscribe(msg => {
      this.messageList.push(msg);
      console.log(this.messageList);
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

  sendMessage(): void {
    this.wsService.sendMessage('newMessage', this.newMessage);
    this.newMessage = '';
  }
}
