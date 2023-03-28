import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  template: `
    <header class="toolbar" role="banner">
      <div class="container">
        <span class="toolbar-title">{{title}}</span>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title = '';
}
