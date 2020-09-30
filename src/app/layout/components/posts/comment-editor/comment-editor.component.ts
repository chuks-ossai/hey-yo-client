import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IPost } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/layout/services/post.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'heyyo-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
  providers: [PostService]
})
export class CommentEditorComponent implements OnInit {

  @Input() post: IPost;
  public commentForm: FormGroup = new FormGroup({});
  public errMessage: string;
  isProcessing = false;

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder, public postService: PostService, private wsService: WebSocketService) {
    this.commentForm = this.buildForm();
  }

  ngOnInit(): void {
    this.setId();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      postId: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  setId(): void {
    this.commentForm.patchValue({
      postId: this.post._id
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.isProcessing = true;
      this.postService.addPostComment(this.commentForm.value).subscribe(response => {
        if (response.Success) {
          this.isProcessing = false;
          this.commentForm.reset();
          this.bsModalRef.hide();
          this.wsService.sendMessage('refreshData', {});

        } else {
          this.isProcessing = false;
          if (response.ErrorMessage) {
            this.errMessage = response.ErrorMessage;
          }
        }
      }, err => {
        this.isProcessing = false;
        if (err.error.ErrorMessage) {
          this.errMessage = err.error.ErrorMessage;
        }
      });
    }
  }

}
