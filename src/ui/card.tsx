import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('rounded-xl border bg-white shadow', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-gray-500', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
