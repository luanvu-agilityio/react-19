'use client';

import { useFormStatus } from 'react-dom';
import Button from '../Button';
import { CheckCircle, Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
  isValid: boolean;
  isDirty: boolean;
}

function FormSubmitButton({ isValid, isDirty }: FormSubmitButtonProps) {
  const { pending, data } = useFormStatus();

  const currentStep = data?.get('currentStep') as string;
  const isLastStep = currentStep === '2';

  return (
    <Button
      type="submit"
      disabled={pending || !isValid || !isDirty}
      size="lg"
      className="w-full sm:w-auto cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isLastStep ? 'Creating Account...' : 'Processing...'}
        </>
      ) : (
        <>
          {isLastStep ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Account
            </>
          ) : (
            'Next Step'
          )}
        </>
      )}
    </Button>
  );
}
export default FormSubmitButton;
