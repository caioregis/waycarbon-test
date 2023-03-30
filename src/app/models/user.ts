import { Post } from "./post";

export interface User {
  id: number;
  username: string;
  memberSince: string;
  friendIds: number[];
  friendsUser?: User[];
  posts: Partial<Post>[];
}