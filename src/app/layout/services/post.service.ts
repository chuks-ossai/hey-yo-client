import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { POST_ENDPOINTS } from '../../constants/api-endpoints/post.endpoints.constant';


const BASE_URL = 'http://localhost:3002';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  public addPost(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${POST_ENDPOINTS.create}`, formData);
  }

  public getAllPosts(): Observable<any> {
    return this.http.get(`${BASE_URL}${POST_ENDPOINTS.getAll}`);
  }
}
