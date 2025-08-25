import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';

export interface AuthorAvatarProps {
  name: string;
  avatar?: string | undefined;
  className?: string;
}

export function AuthorAvatar({ name, avatar, className }: AuthorAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} />
      <AvatarFallback className="text-xs">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
