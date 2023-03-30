import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from 'projects/ui/src/lib/components/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private modalService: ModalService,
    viewContainerRef: ViewContainerRef
  ) {
    this.modalService.setRootViewContainerRef(viewContainerRef)
  }
}
