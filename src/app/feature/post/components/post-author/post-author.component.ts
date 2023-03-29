import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-author',
  templateUrl: './post-author.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAuthorComponent {
  author$ = this.postService.post$.pipe(map(p => p?.author));
  timestamp$ = this.postService.post$.pipe(map(p => p?.timestamp));

  constructor(private postService: PostService) {}
}
