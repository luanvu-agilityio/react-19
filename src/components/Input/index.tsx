'use client';

import { cn } from '@/lib';
import { ComponentProps, ReactNode, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  variant?: 'primary' | 'secondary';
  hideLabel?: boolean;
  hintText?: string;
  errorMessage?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  leftElementClasses?: string;
  rightElementClasses?: string;
}

const Input = ({
  id,
  label = '',
  className,
  type = 'text',
  variant = 'primary',
  hideLabel = false,
  disabled,
  hintText,
  errorMessage,
  leftElement,
  rightElement,
  leftElementClasses,
  rightElementClasses,
  onChange,
  ...props
}: InputProps) => {
  const internalId = useId();
  const resolvedId = id ?? `input-${internalId}`;
  const hintId = `hint-${internalId}`;
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={resolvedId}
          className={cn('text-sm font-medium text-placeholder', {
            'sr-only': hideLabel,
          })}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex items-center h-10 w-full min-w-0 rounded-2xl border text-sm transition-colors',
          'px-4 focus-within:border-white',
          {
            'bg-accent-foreground border-muted-foreground':
              variant === 'primary',
            'bg-white-background border-transparent': variant === 'secondary',
            'border-destructive ring-destructive/20': hasError,
            'cursor-not-allowed opacity-50': disabled,
          },
          className
        )}
      >
        {/* Left element */}
        {leftElement && (
          <span className={cn('flex mr-2 text-foreground', leftElementClasses)}>
            {leftElement}
          </span>
        )}

        {/* Input */}
        <input
          id={resolvedId}
          type={type}
          disabled={disabled}
          aria-label={hideLabel ? label : undefined}
          aria-invalid={hasError}
          aria-describedby={hintText ? hintId : undefined}
          className={cn(
            'w-full bg-transparent outline-none placeholder:text-placeholder',
            'disabled:pointer-events-none disabled:cursor-not-allowed'
          )}
          onChange={onChange}
          {...props}
        />

        {/* Right element */}
        {rightElement && (
          <span
            className={cn('flex ml-2 text-foreground', rightElementClasses)}
          >
            {rightElement}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && <p className="text-sm text-destructive">{errorMessage}</p>}

      {/* Hint text */}
      {hintText && (
        <p id={hintId} className="text-sm text-inactive-foreground">
          {hintText}
        </p>
      )}
    </div>
  );
};

export { Input };
