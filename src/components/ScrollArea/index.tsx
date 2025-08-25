import React from 'react';
import { cn } from '@/lib';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function ScrollArea({
  children,
  className = '',
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(
        'overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollArea;
