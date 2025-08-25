import { User } from './user';

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  pending?: boolean;
}
