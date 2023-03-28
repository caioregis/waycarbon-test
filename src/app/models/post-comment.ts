import { User } from "./user";

export interface PostComment {
  id: number;
  respondsTo: any;
  author: Partial<User>;
  timestamp: string;
  content: string;
}