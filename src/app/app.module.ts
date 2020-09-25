import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { CoreModule } from './core/core.module';
import {
  StreamsComponent,
  PeopleComponent,
  FollowingComponent,
  FollowersComponent,
  PhotosComponent,
  PostsComponent,
  FormModalComponent
} from './layout/components';
import {
  SidebarComponent,
  TopNavComponent,
  FooterComponent,
  HeaderComponent} from './layout/com-parts';
import { PostEditorComponent } from './layout/components/posts/post-editor/post-editor.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ChatListComponent,
    SidebarComponent,
    StreamsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    PhotosComponent,
    TopNavComponent,
    FooterComponent,
    HeaderComponent,
    PostsComponent,
    FormModalComponent,
    PostEditorComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule { }
