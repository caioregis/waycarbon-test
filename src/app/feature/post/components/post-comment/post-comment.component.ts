import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostComment } from 'src/app/models/post-comment';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent {
  @Input() comment: PostComment | null = null;
}
