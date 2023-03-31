import { Component, EventEmitter, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ui-modal',
  template: `
    <div class="modal">
      <span class="modal__close-button" data-testid="close-button" (click)="close()">&times;</span>
      <div class="modal__title" data-testid="title">{{title}}</div>
      <div class="modal__content" data-testid="content">
        <ng-template #viewContainer></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  title: string = '';
  body!: Type<{}>;
  @Output() onClose = new EventEmitter();

  @ViewChild('viewContainer', {read: ViewContainerRef, static: true}) 
    viewContainer!: ViewContainerRef;

  close() {
    this.onClose.emit();
  }

  setup(component: Type<{}>, data: { title: string }) {
    this.title = data.title;
    this.viewContainer.createComponent(component);
  }

}
