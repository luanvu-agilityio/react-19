import * as React from 'react';
import { cn } from '@/lib';

function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'block w-full rounded-md border border-neutral-light bg-white px-3 py-2 text-sm text-quaternary shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectTrigger({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      tabIndex={0}
      className={cn(
        'flex items-center justify-between rounded-md border border-neutral-light bg-white px-3 py-2 text-sm text-quaternary shadow-sm cursor-pointer focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectValue({
  placeholder,
  value,
}: {
  placeholder?: string;
  value?: string;
}) {
  return <span>{value || placeholder}</span>;
}

function SelectContent({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-neutral-light',
        className
      )}
    >
      {children}
    </div>
  );
}

function SelectItem({
  children,
  value,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement> & { value: string }) {
  return (
    <li
      data-value={value}
      className={cn(
        'cursor-pointer select-none px-4 py-2 text-sm text-quaternary hover:bg-muted-background'
      )}
      {...props}
    >
      {children}
    </li>
  );
}
export { Select, SelectContent, SelectTrigger, SelectValue, SelectItem };
