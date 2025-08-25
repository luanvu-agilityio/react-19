import { cn } from '@/lib';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: Readonly<ProgressProps>) {
  return (
    <div
      className={cn(
        'w-full h-3 bg-muted-background rounded-full overflow-hidden',
        className
      )}
    >
      <progress
        className={cn('h-3 w-full', className)}
        value={Math.min(Math.max(value, 0), 100)}
        max={100}
      />
    </div>
  );
}

export default Progress;
