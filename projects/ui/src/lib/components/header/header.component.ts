import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-header',
  template: `
    <header role="banner">
      <div class="topbar">
        <span class="topbar-title container">{{title}}</span>
      </div>
      <img [src]="imgSrc" [alt]="imgAlt"> 
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title = '';
  @Input() imgSrc = '';
  @Input() imgAlt = '';
}
