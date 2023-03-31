import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from '@ui';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'projects/ui/src/lib/components/modal/modal.service';
import { ViewContainerRef } from '@angular/core';

const modalServiceStub = {
  setRootViewContainerRef: () => {},
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ModalService, useValue: modalServiceStub }
      ],
      imports: [RouterTestingModule, HeaderComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should setRootViewContainerRef on constructor', () => {
    const modalService = TestBed.inject(ModalService);
    const spy = spyOn(modalService, 'setRootViewContainerRef');

    const fixture = TestBed.createComponent(AppComponent);
    const viewContainerRef = fixture.componentRef.injector.get(ViewContainerRef);
    
    expect(spy).toHaveBeenCalledWith(viewContainerRef);
  });

});
