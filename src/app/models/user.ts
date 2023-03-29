import { Post } from "./post";

export interface User {
  id: number;
  username: string;
  memberSince: string;
  friendIds: number[];
  posts: Partial<Post>[];
}