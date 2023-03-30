import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderComponent, AvatarCardInfoComponent, SafeHtmlPipe } from '@ui';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostAuthorComponent } from './components/post-author/post-author.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostUserModalComponent } from './components/post-user-modal/post-user-modal.component';


@NgModule({
  declarations: [
    PostComponent,
    PostAuthorComponent,
    PostCommentComponent,
    PostUserModalComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    LoaderComponent,
    AvatarCardInfoComponent,
    SafeHtmlPipe
  ],
  exports: [
    PostComponent
  ]
})
export class PostModule {}
