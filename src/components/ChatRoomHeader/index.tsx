import { CardTitle, CardDescription } from '@/ui';
import { MessageSquare, User as UserIcon } from 'lucide-react';
import Badge from '../Badge';

interface ChatRoomHeaderProps {
  roomName: string;
  memberCount: number;
  messageCount: number;
}

export function ChatRoomHeader({
  roomName,
  memberCount,
  messageCount,
}: ChatRoomHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-lg">{roomName}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <UserIcon className="h-3 w-3" />
          {memberCount} members online
        </CardDescription>
      </div>
      <Badge variant="secondary">
        <MessageSquare className="h-3 w-3 mr-1" />
        {messageCount} messages
      </Badge>
    </div>
  );
}
