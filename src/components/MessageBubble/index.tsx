import { cn } from '@/lib';
import { ChatMessage } from '@/types';
import { Loader2 } from 'lucide-react';
import Button from '../Button';
import { AuthorAvatar } from '../AuthorAvatar';

interface MessageBubbleProps {
  message: ChatMessage;
  currentUserId: string;
  onReact: (messageId: string, emoji: string) => void;
}

export function MessageBubble({
  message,
  currentUserId,
  onReact,
}: MessageBubbleProps) {
  const isOwn = message.author.id === currentUserId;

  return (
    <div className={cn('flex mb-4', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-xs lg:max-w-md px-4 py-3 rounded-lg relative',
          isOwn ? 'bg-muted-background text-muted-foreground' : 'bg-muted',
          message.pending && 'opacity-60'
        )}
      >
        {!isOwn && (
          <div className="flex items-center gap-2 mb-2">
            <AuthorAvatar
              name={message.author.name}
              avatar={message.author.avatar}
              className="h-6 w-6"
            />
            <span className="text-sm font-semibold">{message.author.name}</span>
          </div>
        )}

        <div className="break-words">{message.content}</div>

        {message.pending && (
          <div className="flex items-center gap-1 text-xs mt-1 opacity-75">
            <Loader2 className="h-3 w-3 animate-spin" />
            Sending...
          </div>
        )}

        <div className="text-xs mt-2 opacity-75">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>

        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => onReact(message.id, reaction.emoji)}
                className="h-6 px-2 text-xs bg-background/20 hover:bg-background/30"
              >
                {reaction.emoji} {reaction.count}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
