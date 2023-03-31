import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from 'src/testing/on-push-change-detection.helper';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not passed value to inputs', async () => {
    await runOnPushChangeDetection(fixture);

    const titleText = debugElement.query(By.css('[data-testid="header-title"]'));
    const imgSrc = debugElement.query(By.css('[data-testid="header-img"]'));
    
    expect(titleText.nativeElement.textContent).toBe('');
    expect(imgSrc.nativeElement.src).toBe(`${location.origin}/`);
    expect(titleText.nativeElement.alt).toBe(undefined);
  });

  it('should assert inputs', async () => {
    component.title = 'title';
    component.imgSrc = 'imgSrc';
    component.imgAlt = 'imgAlt';

    await runOnPushChangeDetection(fixture);

    const titleText = debugElement.query(By.css('[data-testid="header-title"]'));
    const imgSrc = debugElement.query(By.css('[data-testid="header-img"]'));
    
    expect(titleText.nativeElement.textContent).toBe('title');
    expect(imgSrc.nativeElement.src).toBe(`${location.origin}/imgSrc`);
    expect(imgSrc.nativeElement.alt).toBe('imgAlt');
  });
});
