import React from 'react';
import { cn } from '@/lib';

export function Avatar({ className, children }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-muted overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export function AvatarImage({
  src,
  alt = '',
  className,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-cover w-full h-full', className)}
    />
  );
}

export function AvatarFallback({
  children,
  className,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'flex items-center justify-center w-full h-full',
        className
      )}
    >
      {children}
    </span>
  );
}
