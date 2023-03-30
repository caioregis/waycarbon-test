import { Injectable, OnDestroy } from '@angular/core';
import { users } from 'data/users';
import { ModalService } from 'projects/ui/src/lib/components/modal/modal.service';
import { BehaviorSubject, map, Observable, of, takeWhile, tap } from 'rxjs';
import { User } from '../../models/user';
import { PostUserModalComponent } from '../post/components/post-user-modal/post-user-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private userList = new BehaviorSubject<User[]>([]);
  readonly userList$ = this.userList.asObservable();

  private currentUser = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.currentUser.asObservable();

  private listening = true;

  constructor(private modalService: ModalService) {}

  ngOnDestroy(): void {
    this.listening = false;
  }

  getUserList(): Observable<User[]>  {
    const list = this.userList.getValue();

    if (list?.length) {
      return of(list);
    }

    return of(users)
    .pipe(
      takeWhile(() => this.listening),
      tap(list => this.userList.next(list)),
    );
  }

  getUserInfo(id: number): Observable<User> {
    return this.getUserList()
      .pipe(
        map(list => this.getUserById(list, id)),
        takeWhile(() => this.listening)
      );
  }

  private getUserById(list: User[], id: number) {
    return list?.find(u => u.id === id) ?? {} as User
  }

  showModalUserInfo(id: number) {
    this.getUserInfo(id)
      .subscribe(user => {
        this.currentUser.next(user);
        this.modalService.openModal(PostUserModalComponent, {
          title: user.username,
        });
      });
  }

}
