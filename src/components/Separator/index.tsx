import { cn } from '@/lib';

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className }: SeparatorProps) => (
  <hr className={cn('border-neutral-light my-4', className)} />
);

export default Separator;
