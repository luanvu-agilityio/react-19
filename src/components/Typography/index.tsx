import { ReactNode } from 'react';
import { cn } from '@/lib';

interface TypographyProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  content?: string;
  children?: ReactNode;
}

const Typography = ({
  size = 'md',
  className,
  content,
  children,
}: TypographyProps) => (
  <p
    role="paragraph"
    className={cn(
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-md': size === 'md',
        'text-lg': size === 'lg',
      },
      className
    )}
  >
    {children ?? content}
  </p>
);

Typography.displayName = 'Typography';

export { Typography, type TypographyProps };
