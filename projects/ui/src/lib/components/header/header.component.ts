import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  template: `
    <header role="banner">
      <div class="topbar">
        <span class="topbar-title container">{{title}}</span>
      </div>
      <img src="../../../assets/header-image.jpg" alt="img-background-tree"> 
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title = '';
}
