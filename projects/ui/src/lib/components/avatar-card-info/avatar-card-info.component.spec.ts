import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCardInfoComponent } from './avatar-card-info.component';

describe('AvatarCardComponent', () => {
  let component: AvatarCardInfoComponent;
  let fixture: ComponentFixture<AvatarCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarCardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
