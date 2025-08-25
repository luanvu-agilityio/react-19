import * as React from 'react';

import { cn } from '@/lib';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-accent text-accent-foreground hover:bg-accent-background',
    outline:
      'border border-neutral-light bg-white hover:bg-muted-background text-quaternary',
    ghost: 'hover:bg-muted-background text-quaternary',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive-background',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
