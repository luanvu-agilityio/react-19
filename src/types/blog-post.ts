import { User } from './user';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: User;
  publishedAt: string;
  tags: string[];
}
