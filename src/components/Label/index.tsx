import { cn } from '@/lib/utils';

const Label = ({
  children,
  className = '',
  ...props
}: React.ComponentProps<'label'>) => (
  <label
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-quaternary',
      className
    )}
    {...props}
  >
    {children}
  </label>
);

export default Label;
