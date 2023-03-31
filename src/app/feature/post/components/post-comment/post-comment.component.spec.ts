import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { postExpected } from 'data/mock-post-tree';
import { UserService } from 'src/app/feature/user/user.service';
import { click } from 'testing/click.helper';
import { runOnPushChangeDetection } from 'testing/on-push-change-detection.helper';
import { postServiceStub } from 'testing/post-service.stub';
import { PostService } from '../../services/post.service';

import { PostCommentComponent } from './post-comment.component';

const userServiceStub = {
  showModalUserInfo: () => {}
}

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;
  let userService: UserService;
  let postService: PostService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentComponent ],
      providers: [
        { provide: PostService, useValue: postServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    userService = TestBed.inject(UserService);
    postService = TestBed.inject(PostService);
    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    component.comments = [...postExpected.comments]; 
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });

  it('should showModalUserInfo', () => {
    const spy = spyOn(userService, 'showModalUserInfo');

    click(fixture, 'username-show-modal');

    expect(spy).toHaveBeenCalledWith(postExpected.comments[0].author.id);
  });

  it('should username', () => {
    const users = fixture.debugElement.query(By.css('[data-testid="username-show-modal"]'));

    expect(users.nativeElement.textContent).toEqual(' Joana Vasconcellos - 20 Feb 2019, às 6h30 ');
  });

  it('should content', () => {
    const content = fixture.debugElement.query(By.css('[data-testid="content"]'));

    expect(content.nativeElement.textContent).toEqual(postExpected.comments[0].content);
  });

  it('should like', () => {
    const spy = spyOn(postService, 'like');

    click(fixture, 'like');

    expect(spy).toHaveBeenCalledWith(postExpected.comments[0].id);
  });

  it('should answerToggle', () => {
    const spy = spyOn(postService, 'answerComment');

    click(fixture, 'answerToggle');

    expect(spy).toHaveBeenCalledWith(postExpected.comments[0].id);
  });

  describe('#cancel|confirm actions', () => {
    beforeEach(async() => {
      component.comments[0] = {
        ...component.comments[0],
        isTyping: true
      };
      await runOnPushChangeDetection(fixture);
    });

    it('should cancel', () => {
      const spy = spyOn(postService, 'answerComment');

      click(fixture, 'cancel');

      expect(spy).toHaveBeenCalledWith(postExpected.comments[0].id);
    });
      
    it('should confirm', () => {
      const spy = spyOn(postService, 'saveComment');
      const spycancel = spyOn(component, 'cancel');

      click(fixture, 'confirm');

      expect(spy).toHaveBeenCalledWith(postExpected.comments[0].id, ''); 
      expect(spycancel).toHaveBeenCalledWith(postExpected.comments[0].id);
    });
  });
 
});
