import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-accent-background text-accent',
  secondary: 'bg-secondary-background text-secondary',
  outline: 'border border-neutral-light bg-white text-quaternary',
  destructive: 'bg-destructive-background text-destructive',
};

const Badge = ({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      VARIANT_CLASSES[variant],
      className
    )}
    {...props}
  >
    {children}
  </span>
);
export default Badge;
