import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderComponent, AvatarCardInfoComponent } from '@ui';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostAuthorComponent } from './components/post-author/post-author.component';


@NgModule({
  declarations: [
    PostComponent,
    PostAuthorComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    LoaderComponent,
    AvatarCardInfoComponent
  ],
  exports: [
    PostComponent
  ]
})
export class PostModule {}
