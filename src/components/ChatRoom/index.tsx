import { useChat } from '@/hooks/useChat';
import type { ChatRoom, User } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui';

import { useEffect, useRef } from 'react';

import { MessageBubble } from '../MessageBubble';
import Button from '../Button';
import { MessageInput } from '../MessageInput';
import { ChatRoomHeader } from '../ChatRoomHeader';
import ScrollArea from '../ScrollArea';

interface ChatRoomProps {
  room: ChatRoom;
  currentUser: User;
}

function ChatRoomApp({ room, currentUser }: ChatRoomProps) {
  const { messages, sendMessage, addReaction, isPending } = useChat(
    room?.id,
    currentUser
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!room || !currentUser) {
    return null;
  }

  const recentReactions = ['👍', '❤️', '😂', '😮', '👏', '🔥'];

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardHeader className="pb-3">
          <ChatRoomHeader
            roomName={room.name}
            memberCount={room.memberCount}
            messageCount={messages.length}
          />
        </CardHeader>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              currentUserId={currentUser.id}
              onReact={addReaction}
            />
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex gap-1 justify-center">
            {recentReactions.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => {
                  const lastMessage = messages[messages.length - 1];
                  if (lastMessage && !lastMessage.pending) {
                    addReaction(lastMessage.id, emoji);
                  }
                }}
                className="h-8 w-8 p-0 text-lg hover:scale-110 transition-transform"
              >
                {emoji}
              </Button>
            ))}
          </div>
          <MessageInput onSendMessage={sendMessage} disabled={isPending} />
        </div>
      </CardFooter>
    </Card>
  );
}
export default ChatRoomApp;
