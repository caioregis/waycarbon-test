import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoaderComponent, SafeHtmlPipe } from '@ui';
import { rawPost } from 'data/rawPost';
import { PostComment } from 'src/app/models/post-comment';
import { findEl } from 'testing/find-element.helper';
import { runOnPushChangeDetection } from 'testing/on-push-change-detection.helper';
import { postMock, postServiceStub } from 'testing/post-service.stub';

import { PostComponent } from './post.component';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-post-author'
})
class PostAuthorComponentStub {}

@Component({
  selector: 'app-post-comment'
})
class PostCommentComponentStub {
  @Input() comments: PostComment[] = [];
}


describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent, PostAuthorComponentStub, PostCommentComponentStub ],
      imports: [LoaderComponent, SafeHtmlPipe],
      providers: [
        { provide: PostService, useValue: postServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show when has post', fakeAsync(() => {
    postMock.next(rawPost);

    runOnPushChangeDetection(fixture);

    const titleTextContent = findEl(fixture, 'title').nativeElement.textContent;
    const subtitleTextContent = findEl(fixture, 'subtitle').nativeElement.textContent;
    const contentTextContent = findEl(fixture, 'content').nativeElement.innerHTML;

    expect(titleTextContent).toEqual(rawPost.title);
    expect(subtitleTextContent).toEqual(rawPost.subtitle);
    expect(contentTextContent).toEqual(rawPost.content.replaceAll('<p>', '<p style="margin-bottom: 20px;">'));
  }));

  it('should show loader when hasnt post', fakeAsync(() => {
    const loader = debugElement.query(By.css('ui-loader'));
    expect(loader).toBeTruthy();
  }));
});
