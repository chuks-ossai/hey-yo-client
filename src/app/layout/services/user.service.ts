import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { USER_ENDPOINTS } from '../../constants/api-endpoints/user.endpoints.constant';


const BASE_URL = 'http://localhost:3002';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getAllMyPosts(): Observable<any> {
    return this.http.get(`${BASE_URL}${USER_ENDPOINTS.getMyPosts}`);
  }
}
