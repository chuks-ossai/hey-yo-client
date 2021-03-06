import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;
  readonly uri: string = 'ws://localhost:3002';

  constructor() {
    this.socket = io(this.uri);
   }

  listen$($event: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on($event, data => {
        subscriber.next(data);
      });
    });
  }

  sendMessage($event: string, data?: any): void {
    this.socket.emit($event, data);
  }

  offSocket(): void {
    this.socket.off();
  }
}
