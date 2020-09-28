import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from 'src/app/layout/services/post.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'heyyo-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  providers: [PostService]
})
export class PostEditorComponent implements OnInit {

  public postForm: FormGroup = new FormGroup({});
  public errMessage: string;
  isProcessing = false;

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder, public postService: PostService, private wsService: WebSocketService) {
    this.postForm = this.buildForm();
  }

  ngOnInit(): void {
  }


  buildForm(): FormGroup {
    return this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isProcessing = true;
      this.postService.addPost(this.postForm.value).subscribe(response => {
        if (response.Success) {
          console.log(response);
          this.isProcessing = false;
          this.postForm.reset();
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
