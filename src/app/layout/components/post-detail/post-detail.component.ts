import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPost } from 'src/app/interfaces/post.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { PostService } from '../../services/post.service';
import { CommentEditorComponent } from '../posts/comment-editor/comment-editor.component';
import * as moment from 'moment';

@Component({
  selector: 'heyyo-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  bsModalRef: BsModalRef;
  postId: string;
  post: IPost;
  isProcessing = false;

  constructor(
    private modalService: BsModalService,
    private wsService: WebSocketService,
    private postService: PostService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(val => {
      this.postId = val.id;
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.listenToSocket();
  }

  loadData(): void {
    // this.user = this.tokenService.getUserPayload();
    this.loadPost();
    this.listenToSocket();
  }

  listenToSocket(): void {
    this.wsService.listen$('pageRefresh').subscribe(() => {
      console.log('data refresh');
      this.loadPost();
    });
  }

  loadPost(): void {
    this.postService.getPost(this.postId).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response.Results[0].post);
        this.post = response.Results[0].post;
      } else {
        this.isProcessing = false;
        if (response.ErrorMessage) {
          console.log('response failure', response.ErrorMessage);
        }
      }
    }, (err: any) => {
      this.isProcessing = false;
      if (err.error.ErrorMessage) {
        console.log('catch error', err.error.ErrorMessage);
      }
    });
  }

  onCreateCommentButtonClicked(): void {
    const initialState = {
      post: this.post
    };
    this.bsModalRef = this.modalService.show(CommentEditorComponent, {
      initialState,
      backdrop: true,
      ignoreBackdropClick: true
    });
  }


  formatDate(value: string): any {
    return moment(value).fromNow();
  }

}
