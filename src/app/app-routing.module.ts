import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { LayoutComponent } from './layout/layout.component';
import {
  StreamsComponent,
  PeopleComponent,
  FollowingComponent,
  FollowersComponent,
  PhotosComponent, PostDetailComponent
} from './layout/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'd',
    component: LayoutComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: 'streams', component: StreamsComponent },
      { path: 'post/:id', component: PostDetailComponent },
      { path: 'people', component: PeopleComponent },
      { path: 'following', component: FollowingComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'photos', component: PhotosComponent },
      { path: '', redirectTo: 'streams', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
