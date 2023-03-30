import { User } from "./user";

export interface PostComment {
  id: number;
  respondsTo: {
    id: number;
  } | null;
  author: Partial<User>;
  timestamp: string;
  content: string;
  comments?: PostComment[]
  likes?: number;
}