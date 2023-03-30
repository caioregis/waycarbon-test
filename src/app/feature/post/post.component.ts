import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post$ = this.postService.post$;
  @ViewChild('content') set content(content: ElementRef<HTMLElement> | null) {
    if (content) {
      content?.nativeElement.childNodes
        .forEach(p => this.renderer2.setStyle(p, 'marginBottom', '20px'));
    }
  };

  constructor(
    private postService: PostService,
    private renderer2: Renderer2
  ) {}

}
