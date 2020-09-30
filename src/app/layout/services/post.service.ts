import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/post.interface';

import { POST_ENDPOINTS } from '../../constants/api-endpoints/post.endpoints.constant';


const BASE_URL = 'http://localhost:3002';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<any> {
    return this.http.get(`${BASE_URL}${POST_ENDPOINTS.getAll}`);
  }

  public getPost(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}${POST_ENDPOINTS.getById}/${id}`);
  }

  public addPost(formData: any): Observable<any> {
    return this.http.post(`${BASE_URL}${POST_ENDPOINTS.create}`, formData);
  }


  public likePost(post: IPost, isLiked: boolean): Observable<any> {
    if (isLiked) {
      return this.http.put(`${BASE_URL}${POST_ENDPOINTS.unLike}`, post);
    }
    return this.http.put(`${BASE_URL}${POST_ENDPOINTS.like}`, post);
  }

  public addPostComment(post: IPost): Observable<any> {
    return this.http.put(`${BASE_URL}${POST_ENDPOINTS.comment}`, post);
  }
}
