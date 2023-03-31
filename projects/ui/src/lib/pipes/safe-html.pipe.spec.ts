import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findEl } from 'src/testing/find-element.helper';

import { SafeHtmlPipe } from './safe-html.pipe';

@Component({
  selector: 'component-test',
  template: `<div [innerHTML]="text | safeHtml" data-testid="test-pipe"></div>`,
})
class TestPipeComponent {
  text = '<script></script><p>TEST</p>';
}

describe('SafeHtmlPipe', () => {
  let fixture: ComponentFixture<TestPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeHtmlPipe],
      declarations: [TestPipeComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestPipeComponent);
    fixture.detectChanges();
  });

  it('should be keep safe html - script for example', () => {
    const textPipe = findEl(fixture, 'test-pipe');
    expect(textPipe.query(By.css('script'))).toBeTruthy();
  });
});
