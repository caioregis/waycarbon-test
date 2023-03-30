import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private rootViewContainer!: ViewContainerRef;
  private dialogObservable$!: Subscription;

  openModal(component: Type<{}>, data: { title: string }) {
    this.componentRef = this.rootViewContainer.createComponent(ModalComponent);
    this.dialogObservable$ = this.componentRef.instance.onClose.subscribe(() => this.closeModal());
    this.componentRef.instance.setup(component, data);
  }

  closeModal() {
    this.componentRef.destroy();
    this.dialogObservable$.unsubscribe();
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }
}