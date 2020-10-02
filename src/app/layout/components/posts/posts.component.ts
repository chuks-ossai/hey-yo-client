import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import _ from 'lodash';
import { IPost } from 'src/app/interfaces/post.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'heyyo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts: IPost[];
  @Input() user: IUser;

  @Output() likePost = new EventEmitter<any>();
  @Output() commentPost = new EventEmitter<any>();

  constructor(private wsService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onThumbsUpClicked(post: IPost, isLiked: boolean): void {
    this.likePost.emit({post, isLiked});
  }

  onCommentClicked(post: string): void {
    this.commentPost.emit(post);
  }

  usernameExist(arr: any[], username: string): boolean {
    return _.some(arr, { username });
  }

  formatDate(value: string): any {
    return moment(value).fromNow();
  }

  onPostDetailClicked(postId: string): void {
    this.router.navigate(['../post', `${postId}`], { relativeTo: this.route });
  }
}
