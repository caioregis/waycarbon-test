import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, of, takeWhile } from 'rxjs';
import { rawPost } from 'src/data/rawPost';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {
  private post = new BehaviorSubject<Post | null>(null);
  readonly post$ = this.post.asObservable();

  private listening = true;

  constructor() {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.listening = false;
  }

  loadInitialData(): void {
    of(rawPost)
      .pipe(
        delay(2000),
        takeWhile(() => this.listening)
      )
      .subscribe(post => this.post.next(post));
  }
}
