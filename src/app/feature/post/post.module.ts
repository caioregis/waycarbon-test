import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post.component';
import { PostRoutingModule } from './post.routing.module';
import { LoaderComponent } from '@ui';


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    LoaderComponent
  ],
  exports: [
    PostComponent
  ]
})
export class PostModule {}
