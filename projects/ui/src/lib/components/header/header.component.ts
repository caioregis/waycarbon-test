import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-header',
  template: `
    <header role="banner">
      <div class="topbar">
        <span class="topbar-title container" data-testid="header-title">{{title}}</span>
      </div>
      <img [src]="imgSrc" [alt]="imgAlt" data-testid="header-img"> 
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
