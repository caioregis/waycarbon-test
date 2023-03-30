import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PostComment } from 'src/app/models/post-comment';

type NewComment = {respondTo: number, text: string};

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent {
  @Input() comment: PostComment | null = null;
  @Output() answer = new EventEmitter<NewComment>();

  showAnswerInput = false;

  answerToggle() {
    this.showAnswerInput = true;
  }

  confirm({respondTo, text}: NewComment) {
    this.answer.emit({ respondTo, text });
    this.cancel();
  }

  cancel() {
    this.showAnswerInput = false;
  }

  trackByComment(index: number, comment: PostComment) {
    return comment.id;
  }
}
