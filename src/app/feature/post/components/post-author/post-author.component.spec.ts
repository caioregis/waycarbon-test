import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AvatarCardInfoComponent } from '@ui';
import { Post } from 'src/app/models/post';
import { findEl } from 'src/testing/find-element.helper';
import { runOnPushChangeDetection } from 'testing/on-push-change-detection.helper';
import { postMock, postServiceStub } from 'testing/post-service.stub';
import { PostService } from '../../services/post.service';

import { PostAuthorComponent } from './post-author.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

describe('PostAuthorComponent', () => {
  let component: PostAuthorComponent;
  let fixture: ComponentFixture<PostAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarCardInfoComponent],
      declarations: [ PostAuthorComponent ],
      providers: [
        { provide: PostService, useValue: postServiceStub },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show info - img, name and timestamp', fakeAsync(() => {
    postMock.next({
      author: { id: 1, username: 'testname'},
      timestamp: '2019-02-28T08:21Z'
    } as Post);

    runOnPushChangeDetection(fixture);
    
    const image = findEl(fixture, 'avatar-img');
    const username = findEl(fixture, 'avatar-username');
    const timestamp = findEl(fixture, 'avatar-timestamp');

    expect(image.nativeElement.src).withContext('To fail image').toEqual(`${location.origin}/assets/avatar1.jpg`);
    expect(username.nativeElement.textContent).withContext('To fail username').toEqual('testname');
    expect(timestamp.nativeElement.textContent).withContext('To fail timestamp').toEqual('28 de fev., 2019');
  }));

});
