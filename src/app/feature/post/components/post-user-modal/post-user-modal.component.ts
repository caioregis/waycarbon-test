import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from 'src/app/feature/user/user.service';

@Component({
  selector: 'app-post-user-modal',
  templateUrl: './post-user-modal.component.html',
  styleUrls: ['./post-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostUserModalComponent {
  user$ = this.userService.currentUser$
    .pipe(map(u => {
      return {
        ...u,
        posts: u?.posts.map(p => 
          ({...p, content: p.content?.replace('<p>', '<p class="text-crop">')}))
      }
    }));

  constructor(private userService: UserService) {}
}
