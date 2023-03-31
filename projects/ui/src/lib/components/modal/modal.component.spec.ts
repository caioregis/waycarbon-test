import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from 'src/testing/click.helper';
import { findEl } from 'src/testing/find-element.helper';

import { ModalComponent } from './modal.component';

@Component({
  selector: 'component-test',
  template: `<div>MODAL TEST</div>`,
})
class TestChildComponent {}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent, TestChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', fakeAsync(() => {
    let closed = false;
    
    component.onClose.subscribe(() => closed = true);
    
    click(fixture, 'close-button');

    expect(closed).toBeTruthy();
  }));

  describe('#setup', () => {
    const title = 'MODAL TITLE TEST';

    beforeEach(() => {
      component.setup(TestChildComponent, {title});
    });

    it('should set title', fakeAsync(() => {
      expect(component.title).toEqual(title);
    }));
    
    it('should set component-test into content', fakeAsync(() => {
      const componentTest = debugElement.query(By.css('component-test'));

      expect(componentTest).toBeTruthy();
    }));
  });

});
