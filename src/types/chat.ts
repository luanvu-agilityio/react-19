import { User } from './user';

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  author: User;
  roomId: string;
  createdAt: string;
  pending?: boolean;
  reactions?: { emoji: string; count: number; userIds: string[] }[];
}
