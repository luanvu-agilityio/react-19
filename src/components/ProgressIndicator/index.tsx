import { cn } from '@/lib';
import { CheckCircle } from 'lucide-react';
import Progress from '../Progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: Readonly<ProgressIndicatorProps>) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center space-x-2 text-sm font-medium',
              index <= currentStep ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs',
                index <= currentStep
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              )}
            >
              {index < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className="hidden sm:block">{label}</span>
          </div>
        ))}
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
