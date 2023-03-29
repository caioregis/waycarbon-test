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

  private mapperPost(post: Post, author: User): Post {
    return {
      ...post,
      author,
      comments: this.mapperCommentsPost(post.comments!),
    };
  }

  private mapperCommentsPost(comments: PostComment[]): PostComment[] {
    const arrayToTree = (arr: PostComment[], parentId: number | undefined = undefined): PostComment[] =>
      arr
        .filter((comment) => comment.respondsTo?.id === parentId)
        .map((child) => ({ ...child, comments: arrayToTree(arr, child.id) }));

    return arrayToTree(comments!);
  }
}
