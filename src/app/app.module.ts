import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

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
  PostDetailComponent, NotificationsComponent,
  ChatComponent
} from './layout/components';
import {
  SidebarComponent,
  TopNavComponent,
  FooterComponent,
  HeaderComponent} from './layout/com-parts';
import { PostEditorComponent } from './layout/components/posts/post-editor/post-editor.component';
import { CommentEditorComponent } from './layout/components/posts/comment-editor/comment-editor.component';


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
    PostEditorComponent,
    CommentEditorComponent,
    PostDetailComponent,
    NotificationsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxAutoScrollModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CommentEditorComponent
  ]
})
export class AppModule { }
