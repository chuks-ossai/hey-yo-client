import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostEditorComponent } from '../posts/post-editor/post-editor.component';

@Component({
  selector: 'heyyo-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  @ViewChild('postFormModal') postFormModal: ElementRef;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  onCreatePostButtonClicked(): void {
    this.bsModalRef = this.modalService.show(PostEditorComponent, {
      backdrop: true,
      ignoreBackdropClick: true
    });
    // const modalRef = this.modalService.open(FormModalComponent);
    // modalRef.componentInstance.title = 'Create Post Form';
  }
}
