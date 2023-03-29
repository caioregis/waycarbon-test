import { Injectable, OnDestroy } from '@angular/core';
import { users } from 'data/users';
import { BehaviorSubject, map, Observable, of, takeWhile, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userList = new BehaviorSubject<User[]>([]);
  readonly userList$ = this.userList.asObservable();

  private listening = true;

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
        map(list => this.getUserById(list, id))
      );
  }

  private getUserById(list: User[], id: number) {
    return list?.find(u => u.id === id) ?? {} as User
  }
}
