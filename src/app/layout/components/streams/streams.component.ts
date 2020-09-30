import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostEditorComponent } from '../posts/post-editor/post-editor.component';
import { PostService } from '../../services/post.service';
import { IPost } from '../../../interfaces/post.interface';
import { WebSocketService } from 'src/app/web-socket.service';
import { TokenStoreService } from 'src/app/core/services';
import { IUser } from 'src/app/interfaces/user.interface';
import { CommentEditorComponent } from '../posts/comment-editor/comment-editor.component';

@Component({
  selector: 'heyyo-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
  providers: [PostService]
})
export class StreamsComponent implements OnInit {

  bsModalRef: BsModalRef;
  isProcessing = true;
  posts: IPost;
  user: IUser;

  constructor(
    private modalService: BsModalService,
    private postService: PostService,
    private wsService: WebSocketService, private tokenService: TokenStoreService) { }

  ngOnInit(): void {
    this.loadData();
  }

  onCreatePostButtonClicked(): void {
    this.bsModalRef = this.modalService.show(PostEditorComponent, {
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  onCommentButtonClicked(post: IPost): void {
    const initialState = {
      post
    };
    this.bsModalRef = this.modalService.show(CommentEditorComponent, {
      initialState,
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  loadData(): void {
    this.user = this.tokenService.getUserPayload();
    this.getAllPosts();
    this.listenToSocket();
  }

  listenToSocket(): void {
    this.wsService.listen$('pageRefresh').subscribe(() => {
      console.log('data refresh');
      this.getAllPosts();
    });
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.posts = response.Results;
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

  likePost(event: any): void {
    this.postService.likePost(event.post, event.isLiked).subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        this.wsService.sendMessage('refreshData', {});
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

  commentPost(event: any): void {
    console.log(event);
  }
}
