import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui';
import Button from '../Button';
import { ProgressIndicator } from '../ProgressIndicator';
import { FormStep } from '../FormStep';
import FormSubmitButton from '../FormSubmitButton';
import { handleRegistrationStep } from '@/utils/registration';
import { toast } from '../Toast';

import { InputController } from '../InputController';

// Icons
import { AlertCircle, Loader2 } from 'lucide-react';

// Utils
import {
  Credentials,
  credentialsSchema,
  PersonalInfo,
  personalInfoSchema,
} from '@/utils/validation';
import { RegistrationSuccess } from '../RegistrationSuccess';

interface RegistrationData {
  personalInfo?: PersonalInfo;
  credentials?: Credentials;
}

function RegistrationApp() {
  const [state, submitAction, isPending] = useActionState(
    handleRegistrationStep,
    { data: { step: 0, data: {} as RegistrationData } }
  );
  const currentStep = state.data?.step || 0;
  const stepLabels = ['Personal', 'Account', 'Complete'];
  const formData = state.data?.data as RegistrationData;

  const personalInfoForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData?.personalInfo ?? {},
    mode: 'onTouched',
  });

  const credentialsForm = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: formData?.credentials ?? {},
    mode: 'onTouched',
  });

  if (state.error) {
    toast({
      title: 'Error',
      description: state.error,
      variant: 'error',
      icon: <AlertCircle className="h-4 w-4 text-destructive" />,
      hasCloseIcon: true,
      duration: 3000,
    });
  }

  function handleBack(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const form = (e.target as HTMLButtonElement).form;
    if (!form) return;
    const stepInput = form.querySelector(
      'input[name="currentStep"]'
    ) as HTMLInputElement;
    const directionInput = form.querySelector(
      'input[name="direction"]'
    ) as HTMLInputElement;
    if (stepInput) stepInput.value = String(currentStep - 1);
    if (directionInput) directionInput.value = 'back';
    form.requestSubmit();
  }

  if (currentStep === 2) {
    const username = formData?.credentials?.username;
    const email = formData?.personalInfo?.email;
    return (
      <RegistrationSuccess
        {...(username ? { username } : {})}
        {...(email ? { email } : {})}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Complete all steps to create your new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={stepLabels.length}
          stepLabels={stepLabels}
        />

        <form action={submitAction} className="space-y-6">
          <input type="hidden" name="currentStep" value={currentStep} />

          {isPending && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <FormStep
            title="Personal Information"
            description="Tell us about yourself"
            isActive={currentStep === 0}
          >
            {currentStep === 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputController
                    control={personalInfoForm.control}
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    errorMessage={
                      personalInfoForm.formState.errors.firstName?.message ?? ''
                    }
                  />
                  <InputController
                    control={personalInfoForm.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    errorMessage={
                      personalInfoForm.formState.errors.lastName?.message ?? ''
                    }
                  />
                </div>
                <InputController
                  control={personalInfoForm.control}
                  name="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  type="email"
                  errorMessage={
                    personalInfoForm.formState.errors.email?.message ?? ''
                  }
                />
              </>
            )}
          </FormStep>
          <input type="hidden" name="direction" value="next" />

          <FormStep
            title="Create Account"
            description="Choose your login credentials"
            isActive={currentStep === 1}
          >
            {currentStep === 1 && (
              <>
                <InputController
                  control={credentialsForm.control}
                  name="username"
                  label="Username"
                  placeholder="Choose a unique username"
                  errorMessage={
                    credentialsForm.formState.errors.username?.message ?? ''
                  }
                />
                <InputController
                  control={credentialsForm.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="At least 8 characters"
                  errorMessage={
                    credentialsForm.formState.errors.password?.message ?? ''
                  }
                />
              </>
            )}
          </FormStep>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isPending}
              >
                Back
              </Button>
            )}
            <FormSubmitButton
              isValid={
                currentStep === 0
                  ? personalInfoForm.formState.isValid
                  : credentialsForm.formState.isValid
              }
              isDirty={
                currentStep === 0
                  ? personalInfoForm.formState.isDirty
                  : credentialsForm.formState.isDirty
              }
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
export default RegistrationApp;
