import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-author',
  templateUrl: './post-author.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAuthorComponent {
  post$ = this.postService.post$;

  constructor(private postService: PostService) {}
}
