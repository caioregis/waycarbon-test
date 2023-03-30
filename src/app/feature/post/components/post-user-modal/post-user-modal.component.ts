import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/feature/user/user.service';

@Component({
  selector: 'app-post-user-modal',
  templateUrl: './post-user-modal.component.html',
  styleUrls: ['./post-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostUserModalComponent {
  user$ = this.userService.currentUser$;

  constructor(private userService: UserService) {}
}
