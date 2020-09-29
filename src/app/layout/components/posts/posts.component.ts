import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import _ from 'lodash';
import { IPost } from 'src/app/interfaces/post.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { PostService } from '../../services/post.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'heyyo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts: IPost;
  @Input() user: IUser;

  @Output() likePost = new EventEmitter<IPost>();
  @Output() commentPost = new EventEmitter<any>();

  constructor(private wsService: WebSocketService, private postService: PostService) { }

  ngOnInit(): void {
  }

  onThumbsUpClicked(post: IPost): void {
    this.likePost.emit(post);
  }

  onCommentClicked(post: IPost): void {
    this.commentPost.emit(post);
  }

  usernameExist(arr: any[], username: string): boolean {
    return _.some(arr, { username });
  }

  formatDate(value: string): any {
    return moment(value).fromNow();
  }
}
