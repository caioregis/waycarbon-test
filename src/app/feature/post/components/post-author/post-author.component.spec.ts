import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuthorComponent } from './post-author.component';

describe('PostAuthorComponent', () => {
  let component: PostAuthorComponent;
  let fixture: ComponentFixture<PostAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
