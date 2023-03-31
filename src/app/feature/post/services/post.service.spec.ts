import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { postTreeFormat } from 'data/mock-post-tree';
import { rawPost } from 'data/rawPost';
import { users } from 'data/users';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { UserService } from '../../user/user.service';

import { PostService } from './post.service';

const userServiceStub = {
  getUserInfo: () => of({})
};

describe('PostService', () => {
  let service: PostService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    service = TestBed.inject(PostService);

    expect(service).toBeTruthy();
  });

  it('should ngOnDestroy', () => {
    service = TestBed.inject(PostService);

    service.ngOnDestroy();
    expect(service['listening']).toBeFalsy();
  });

  it('should loadInitialData', fakeAsync(() => {
    service = TestBed.inject(PostService);

    const post = rawPost;
    const spyGetUserInfo = spyOn(userService, 'getUserInfo').and.returnValue(of(users[0]));

    let formattedPost!: Post;
    
    service.loadInitialData();
    tick(2000);
    service.post$.subscribe(post => formattedPost = post!);
    

    expect(spyGetUserInfo).toHaveBeenCalledWith(post.id);
    expect(formattedPost).toEqual(postTreeFormat);
  }));

  it('should saveComment', fakeAsync(() => {
    service = TestBed.inject(PostService);
    
    tick(2000);
    service.saveComment(1, 'Test comment');

    const postValue = service.postValue;
    expect(postValue?.comments?.length).toEqual(2);
  }));

  it('should like', fakeAsync(() => {
    service = TestBed.inject(PostService);
    
    tick(2000);
    service.like(1);

    const postValue = service.postValue;
    expect(postValue?.comments![0].likes).toEqual(1);
    
    service.like(1);
    expect(postValue?.comments![0].likes).toEqual(0);
  }));

  it('should answerComment', fakeAsync(() => {
    service = TestBed.inject(PostService);
    
    tick(2000);
    service.answerComment(1);

    const postValue = service.postValue;
    expect(postValue?.comments![0].isTyping).toBeTruthy();
    
    service.answerComment(1);
    expect(postValue?.comments![0].isTyping).toBeFalsy();
  }));

});
