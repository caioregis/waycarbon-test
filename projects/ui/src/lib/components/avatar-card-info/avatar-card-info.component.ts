import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-avatar-card-info',
  templateUrl: './avatar-card-info.component.html',
  styleUrls: ['./avatar-card-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCardInfoComponent {}
