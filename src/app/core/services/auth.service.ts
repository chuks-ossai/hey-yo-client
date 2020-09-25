import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { USER_ENDPOINTS } from '../../constants/api-endpoints/user.endpoints.constant';

const BASE_URL = 'http://localhost:3002';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public registerUser(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${USER_ENDPOINTS.register}`, formData);
  }

  public loginUser(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${USER_ENDPOINTS.login}`, formData);
  }
}
