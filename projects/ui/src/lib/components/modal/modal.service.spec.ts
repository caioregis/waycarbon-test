import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

import { ModalService } from './modal.service';

@Component({
  selector: 'component-test',
  template: `<div>MODAL TEST</div>`,
})
class TestChildComponent {
  constructor(
    private modalService: ModalService,
    viewContainerRef: ViewContainerRef
  ) {
    this.modalService.setRootViewContainerRef(viewContainerRef)
  }
}

describe('ModalService', () => {
  let service: ModalService;
  let component: TestChildComponent;
  let fixture: ComponentFixture<TestChildComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestChildComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestChildComponent);
    service = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#open/close modal', () => {
    const data = {title: 'MODAL TITLE TEST'};
    let modal: DebugElement,
        componentTest: DebugElement;

    beforeEach(() => {
      service.openModal(TestChildComponent, data);
      modal = debugElement.query(By.css('ui-modal'));
      componentTest = debugElement.query(By.css('component-test'));
    });

    it('should be openModal and openModal', () => {
      expect(modal).toBeTruthy();
      expect(componentTest).toBeTruthy();
      expect(componentTest.query(By.css('div')).nativeElement.textContent).toEqual('MODAL TEST');
    });
  
    it('should be closeModal', () => {
      service.closeModal();
  
      modal = debugElement.query(By.css('ui-modal'));
      componentTest = debugElement.query(By.css('component-test'));
      
      expect(modal).toBeNull();
      expect(componentTest).toBeNull();
    });
  });

  it('should be created', () => {
    const viewContainerRef = {} as ViewContainerRef;
    service.setRootViewContainerRef(viewContainerRef);
    expect(service['rootViewContainer']).toEqual(viewContainerRef);
  });

});
