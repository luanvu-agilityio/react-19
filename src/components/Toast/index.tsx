'use client';

import { ReactNode } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { Typography } from '../Typography';

type ToastVariant = 'success' | 'error' | 'warning';

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: ReactNode;
  hasCloseIcon?: boolean;
  duration?: number;
}

const toast = (toast: Omit<ToastProps, 'id'> & { duration?: number }) =>
  sonnerToast.custom(
    (id) => <Toast id={id} {...toast} />,
    toast.duration !== undefined ? { duration: toast.duration } : {}
  );

const dismissToast = (id?: string | number) => {
  sonnerToast.dismiss(id);
};

const Toast = ({
  id,
  title,
  description,
  variant = 'success',
  icon,
  hasCloseIcon,
}: ToastProps) => {
  const handleClose = () => {
    sonnerToast.dismiss(id);
  };

  return (
    <div
      className={clsx(
        'flex max-w-[360px] w-full xs:w-[360px] sm:w-[360px] gap-2 rounded-lg py-3 px-4 mx-auto border ',
        {
          'bg-success-background border-success-foreground ':
            variant === 'success',
          'bg-destructive-background border-destructive-foreground text-destructive':
            variant === 'error',
          'bg-warning-background border-warning-foreground text-warning':
            variant === 'warning',
        }
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}

      <div className="flex flex-1 flex-col items-start gap-1">
        <Typography size="sm" className="font-medium" content={title} />
        {description && <Typography size="sm" content={description} />}
      </div>

      {hasCloseIcon && (
        <button
          className="flex text-muted cursor-pointer"
          aria-label="Close"
          onClick={handleClose}
        >
          <X className="size-5" />
        </button>
      )}
    </div>
  );
};

export { Toast, Toaster, toast, dismissToast };
