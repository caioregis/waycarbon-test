import { User } from "./user";
import { PostComment } from "./post-comment";

export interface Post {
  id: number;
  timestamp?: string;
  author?: Partial<User>;
  title: string;
  subtitle: string;
  content: string;
  comments?: PostComment[];
}