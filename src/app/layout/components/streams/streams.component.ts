import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostEditorComponent } from '../posts/post-editor/post-editor.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'heyyo-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
  providers: [UserService]
})
export class StreamsComponent implements OnInit {

  @ViewChild('postFormModal') postFormModal: ElementRef;
  bsModalRef: BsModalRef;
  isProcessing = true;

  constructor(private modalService: BsModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  onCreatePostButtonClicked(): void {
    this.bsModalRef = this.modalService.show(PostEditorComponent, {
      backdrop: true,
      ignoreBackdropClick: true
    });
    // const modalRef = this.modalService.open(FormModalComponent);
    // modalRef.componentInstance.title = 'Create Post Form';
  }

  getMyPosts(): void {
    this.userService.getAllMyPosts().subscribe(response => {
      if (response.Success) {
        this.isProcessing = false;
        console.log(response);
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
}
