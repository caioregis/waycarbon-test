import { Component } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  comments$ = this.postService.post$.pipe(map(p => p?.comments));

  constructor(private postService: PostService) {}

  answer({respondTo, text}: any) {
    this.postService.saveComment(respondTo, text);
  }
}
