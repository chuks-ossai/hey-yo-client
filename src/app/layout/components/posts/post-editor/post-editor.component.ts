import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StreamsService } from 'src/app/layout/services/streams.service';

@Component({
  selector: 'heyyo-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  providers: [StreamsService]
})
export class PostEditorComponent implements OnInit {

  public postForm: FormGroup = new FormGroup({});
  public errMessage: string;
  isProcessing = false;

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder, public streamsService: StreamsService) {
    this.postForm = this.buildForm();
  }

  ngOnInit(): void {
  }


  buildForm(): FormGroup {
    return this.fb.group({
      content: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isProcessing = true;
      this.streamsService.addPost(this.postForm.value).subscribe(response => {
        if (response.Success) {
          console.log(response);
          this.isProcessing = false;
          this.postForm.reset();
          this.bsModalRef.hide();
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
