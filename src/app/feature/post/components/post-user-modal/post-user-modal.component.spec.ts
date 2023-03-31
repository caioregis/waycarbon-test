import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SafeHtmlPipe } from '@ui';
import { users } from 'data/users';
import { of } from 'rxjs';
import { UserService } from 'src/app/feature/user/user.service';
import { findEl } from 'testing/find-element.helper';

import { PostUserModalComponent } from './post-user-modal.component';

const user = {...users[0]};
const userServiceStub = {
  currentUser$: of(user)
}

describe('PostUserModalComponent', () => {
  let component: PostUserModalComponent;
  let fixture: ComponentFixture<PostUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeHtmlPipe],
      declarations: [ PostUserModalComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should avatar', () => {
    const avatarEl = findEl(fixture, 'avatar');
    expect(avatarEl.nativeElement.src).toEqual(`${location.origin}/assets/avatar1.jpg`);
  });
    
  it('should username', () => {
    const usernameEl = findEl(fixture, 'username');
    expect(usernameEl.nativeElement.innerText).toEqual(`Nome:${user.username}`);
  });
      
  it('should memberSince', () => {
    const memberSinceEl = findEl(fixture, 'memberSince');
    expect(memberSinceEl.nativeElement.innerText).toEqual('Membro desde:3 de May, 2014');
  });
        
  it('should posts-count', () => {
    const postsCountEl = findEl(fixture, 'posts-count');
    expect(postsCountEl.nativeElement.innerText).toEqual(`Postagens (${user.posts.length})`);
  });        
  
  it('should posts', () => {
    const postsEl = fixture.debugElement.queryAll(By.css('[data-testid="posts"]'));
    expect(postsEl.length).toEqual(user.posts.length);
  });
});
