import { toast } from '@/components';
import { getMockMessages } from '@/mock';
import { ChatMessage, User } from '@/types';
import { useOptimistic, useState, useTransition } from 'react';

export function useChat(roomId: string, currentUser: User) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    getMockMessages(roomId)
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (
      state: ChatMessage[],
      newMessage: Omit<ChatMessage, 'id' | 'createdAt'>
    ): ChatMessage[] => [
      ...state,
      {
        ...newMessage,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        pending: true,
      },
    ]
  );

  const [isPending, startTransition] = useTransition();

  const sendMessage = async (content: string) => {
    const messageData = {
      content,
      author: currentUser,
      roomId,
      reactions: [],
    };

    addOptimisticMessage(messageData);

    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newMessage: ChatMessage = {
          ...messageData,
          id: `msg-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
      } catch (error) {
        console.error('Error sending message:', error);

        setMessages((prev) =>
          prev.filter(
            (msg) =>
              !(
                msg.pending &&
                msg.content === messageData.content &&
                msg.author.id === currentUser.id
              )
          )
        );
        toast({
          title: 'Failed to send message',
          description: 'Please try again.',
          variant: 'error',
        });
      }
    });
  };

  const addReaction = async (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions: {
            emoji: string;
            count: number;
            userIds: string[];
          }[] = msg.reactions ?? [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);
          if (existingReaction?.userIds?.includes(currentUser.id)) {
            const newReactions = reactions
              .map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: r.count - 1,
                      userIds: r.userIds.filter((id) => id !== currentUser.id),
                    }
                  : r
              )
              .filter((r) => r.count > 0);
            return {
              ...msg,
              reactions: newReactions,
            };
          } else if (existingReaction) {
            const newReactions = reactions.map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    count: r.count + 1,
                    userIds: [...r.userIds, currentUser.id],
                  }
                : r
            );
            return {
              ...msg,
              reactions: newReactions,
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...reactions,
                { emoji, count: 1, userIds: [currentUser.id] },
              ],
            };
          }
        }
        return msg;
      })
    );

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  return {
    messages: optimisticMessages,
    sendMessage,
    addReaction,
    isPending,
  };
}
