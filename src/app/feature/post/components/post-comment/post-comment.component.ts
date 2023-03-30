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

  private showAnswerInput: number[] = [];

  constructor(private postService: PostService) {}

  showAnswer(id: number) {
    return this.showAnswerInput.includes(id);
  }

  answerToggle(id: number) {
    this.showAnswerInput.push(id);
  }

  confirm({respondTo, text}: NewComment) {
    this.postService.saveComment(respondTo, text);
    this.cancel(respondTo);
  }

  like(id: number) {
    this.postService.like(id);
  }

  cancel(id: number) {
    this.showAnswerInput = this.showAnswerInput
      .filter(commentId => commentId !== id);
  }
}
