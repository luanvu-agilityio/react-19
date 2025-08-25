import { ChatMessage } from '@/types';

export function getMockMessages(roomId: string): ChatMessage[] {
  return [
    {
      id: '1',
      content: 'Welcome to the chat room! 👋',
      author: {
        id: 'system',
        name: 'System',
        email: 'system@chat.com',
        role: 'admin',
      },
      roomId,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      reactions: [
        { emoji: '👋', count: 3, userIds: ['user1', 'user2', 'user3'] },
      ],
    },
    {
      id: '2',
      content: "Hey everyone! How's everyone doing today?",
      author: {
        id: 'user2',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'user',
      },
      roomId,
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
  ];
}
