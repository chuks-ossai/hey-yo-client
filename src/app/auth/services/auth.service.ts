import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ApiEndpoints from '../../constants/api-endpoints.constant';

const BASE_URL = 'http://localhost:3002';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
    console.log
  }

  public registerUser(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${ApiEndpoints.USER.register}`, formData);
  }

  public loginUser(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${ApiEndpoints.USER.login}`, formData);
  }
}
