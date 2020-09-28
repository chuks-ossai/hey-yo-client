import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/post.interface';
import * as moment from 'moment';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'heyyo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts: IPost;

  constructor(private wsService: WebSocketService) { }

  ngOnInit(): void {
  }

  onThumbsUpClicked(): void {

  }

  onCommentClicked(): void {

  }

  formatDate(value: string): any {
    return moment(value).fromNow();
  }
}
