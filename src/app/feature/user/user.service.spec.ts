import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { users } from 'data/users';
import { ModalService } from 'projects/ui/src/lib/components/modal/modal.service';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { PostUserModalComponent } from '../post/components/post-user-modal/post-user-modal.component';

import { UserService } from './user.service';

const modalServiceStub = {
  openModal: () => {},
};

describe('UserService', () => {
  let service: UserService;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ModalService, useValue: modalServiceStub }
      ]
    });
    service = TestBed.inject(UserService);
    modalService = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ngOnDestroy', () => {
    service.ngOnDestroy();
    expect(service['listening']).toBeFalsy();
  });

  it('should getUserList', fakeAsync(() => {
    let listExpected = [];
    service.getUserList().subscribe(list => listExpected = list);
    expect(!!listExpected.length).toBeTruthy();
  }));

  it('should getUserInfo', fakeAsync(() => {
    let userExpected!: User;
    const user = users[0];

    service.getUserInfo(user.id).subscribe(user => userExpected = user);

    expect(userExpected.id).toEqual(user.id);
    expect(userExpected.friendsUser?.length).toEqual(user.friendIds.length);
  }));

  it('should showModalUserInfo', fakeAsync(() => {
    let userExpected!: User;
    const user = users[0];
    const spyGetUserInfo = spyOn(service, 'getUserInfo').and.returnValue(of(user));
    const spyOpenModal = spyOn(modalService, 'openModal');

    service.currentUser$.subscribe(currUser => userExpected = currUser!);

    service.showModalUserInfo(user.id);

    expect(userExpected).toEqual(user);
    expect(spyGetUserInfo).toHaveBeenCalledWith(user.id);
    expect(spyOpenModal).toHaveBeenCalledWith(PostUserModalComponent, {
      title: `Dados do Usuário - ${user.username}`,
    });
  }));
});
