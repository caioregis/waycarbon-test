import { Injectable, OnDestroy } from '@angular/core';
import { rawPost } from 'data/rawPost';
import { BehaviorSubject, delay, map, of, switchMap, takeWhile } from 'rxjs';
import { User } from '../../../models/user';
import { Post } from '../../../models/post';
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
        switchMap(post => this.userService.getUserInfo(rawPost.id)
          .pipe(
            map((user: User) => this.mapperAuthorPost(post, user)),
          )
        ),
        takeWhile(() => this.listening)
      )
      .subscribe((post) => this.post.next(post));
  }

  private mapperAuthorPost(post: Post, user: User): Post {
    return { ...post, author: user };
  }
}
