import { Injectable, OnDestroy } from '@angular/core';
import { rawPost } from 'data/rawPost';
import { BehaviorSubject, delay, map, of, switchMap, takeWhile } from 'rxjs';
import { PostComment } from 'src/app/models/post-comment';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  private post = new BehaviorSubject<Post | null>(null);
  readonly post$ = this.post.asObservable();

  private listening = true;

  constructor(private userService: UserService) {
    this.loadInitialData();
  }

  get postValue() {
    return this.post.getValue();
  }

  ngOnDestroy(): void {
    this.listening = false;
  }

  loadInitialData(): void {
    of(rawPost)
      .pipe(
        delay(2000),
        switchMap((post) =>
          this.userService
            .getUserInfo(rawPost.id)
            .pipe(map((author: User) => this.mapperPost(post, author)))
        ),
        takeWhile(() => this.listening)
      )
      .subscribe((post) => this.post.next(post));
  }

  saveComment(respondTo: number, text: string) {
    let comment = this.findInTree(this.postValue?.comments!, respondTo)

    if (comment) {
      const newComment = {
        id: Math.ceil(Math.random() * 10000), 
        respondsTo: { id: respondTo }, 
        author: { username: 'TEST' }, 
        timestamp: new Date().toDateString(), 
        content: text 
      } as PostComment;

      comment.comments = [
        ...(comment.comments ? comment.comments : []),
        { ...newComment }
      ];
    }
  }

  like(id: number) {
    let comment = this.findInTree(this.postValue?.comments!, id)
    if (comment)
      comment.likes = !comment.likes ? 1 : 0
  }

  answerComment(id: number) {
    let comment = this.findInTree(this.postValue?.comments!, id)
    if (comment)
      comment.isTyping = !comment.isTyping;
  }

  private mapperPost(post: Post, author: User): Post {
    return {
      ...post,
      author,
      comments: this.mapperCommentsPost(post.comments!),
    };
  }

  private mapperCommentsPost(comments: PostComment[]): PostComment[] {
    const arrayToTree = (list: PostComment[], parentId: number | undefined = undefined): PostComment[] =>
    list
      .filter((comment) => comment.respondsTo?.id === parentId)
      .map((child) => ({ ...child, comments: arrayToTree(list, child.id) }));

    return arrayToTree(comments!);
  }

  private findInTree = (list: PostComment[], id: number): PostComment | null => {
    for (const comment of list) {
      if (comment.id === id) {
        return comment;
      }
      if (comment.comments?.length) {
        const result = this.findInTree(comment.comments, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
}
