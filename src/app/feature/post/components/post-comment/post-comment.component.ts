import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostComment } from 'src/app/models/post-comment';
import { PostService } from '../../services/post.service';

type NewComment = {respondTo: number, text: string};

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent {
  @Input() comments: PostComment[] = [];

  showAnswerInput = false;

  constructor(private postService: PostService) {}

  answerToggle() {
    this.showAnswerInput = true;
  }

  confirm({respondTo, text}: NewComment) {
    this.postService.saveComment(respondTo, text);
    this.cancel();
  }

  like(id: any) {
    this.postService.like(id);
  }

  cancel() {
    this.showAnswerInput = false;
  }
}
