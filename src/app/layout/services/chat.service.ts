import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CHAT_ENDPOINTS } from '../../constants/api-endpoints/chat-endpoints.constant';


const BASE_URL = 'http://localhost:3002';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public getMessages(receiverId: string): Observable<any> {
    return this.http.get(`${BASE_URL}${CHAT_ENDPOINTS.getMessages}/${receiverId}`);
  }

  public senNewMessage(receiverId: string, formData: any): Observable<any> {
    return this.http.put(`${BASE_URL}${CHAT_ENDPOINTS.sendMessage}/${receiverId}`, formData);
  }

}
