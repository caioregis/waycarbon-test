import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderComponent, AvatarCardInfoComponent, SafeHtmlPipe } from '@ui';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostAuthorComponent } from './components/post-author/post-author.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';


@NgModule({
  declarations: [
    PostComponent,
    PostAuthorComponent,
    PostCommentComponent
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
