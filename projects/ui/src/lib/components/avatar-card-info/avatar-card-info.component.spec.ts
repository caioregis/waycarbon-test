import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AvatarCardInfoComponent } from './avatar-card-info.component';

@Component({
  template: `
  <ui-avatar-card-info>
    <div class="title">TITLE</div>
    <div class="subtitle">SUBTITLE</div>
  </ui-avatar-card-info>
  `,
})
class TestHostComponent {}


describe('AvatarCardComponent', () => {
  let component: AvatarCardInfoComponent;
  let fixture: ComponentFixture<AvatarCardInfoComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AvatarCardInfoComponent ],
      declarations: [ TestHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    console.log(debugElement)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const titleText = debugElement.query(By.css('[data-testid="title"]'));
    const subtitleText = debugElement.query(By.css('[data-testid="subtitle"]'));
    
    expect(titleText.nativeElement.textContent).toBe('TITLE');
    expect(subtitleText.nativeElement.textContent).toBe('SUBTITLE');
  });
});
