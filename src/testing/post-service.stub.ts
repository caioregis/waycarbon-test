import { Subject } from "rxjs";
import { Post } from "src/app/models/post";

export const postMock = new Subject<Post>();

export const postServiceStub = {
  post$: postMock.asObservable(),
  ngOnDestroy: () => {},
  loadInitialData: () => {},
  saveComment: () => {},
  like: () => {},
  answerComment: () => {}
};