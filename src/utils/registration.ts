import { ActionState } from '@/types';
import { personalInfoSchema, credentialsSchema } from './validation';
import z from 'zod';

interface RegistrationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  credentials: {
    username: string;
    password: string;
  };
}

export async function handleRegistrationStep(
  prevState: ActionState<{ step: number; data: Partial<RegistrationData> }>,
  formData: FormData
): Promise<ActionState<{ step: number; data: Partial<RegistrationData> }>> {
  const currentStep = parseInt(formData.get('currentStep') as string);
  const direction = formData.get('direction') as string;
  const currentData = prevState.data?.data || {};

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (direction === 'back') {
      return {
        data: {
          step: currentStep,
          data: currentData,
        },
        success: true,
      };
    }

    if (currentStep === 0) {
      const personalInfo = personalInfoSchema.parse({
        firstName:
          typeof formData.get('firstName') === 'string'
            ? formData.get('firstName')
            : '',
        lastName:
          typeof formData.get('lastName') === 'string'
            ? formData.get('lastName')
            : '',
        email:
          typeof formData.get('email') === 'string'
            ? formData.get('email')
            : '',
      });

      return {
        data: {
          step: 1,
          data: { ...currentData, personalInfo },
        },
        success: true,
      };
    }

    if (currentStep === 1) {
      const credentials = credentialsSchema.parse({
        username: formData.get('username') ?? '',
        password: formData.get('password') ?? '',
      });
      const finalData = { ...currentData, credentials };
      const mockResponse = Math.random() > 0.1;
      if (!mockResponse) {
        throw new Error('Username already exists');
      }
      return {
        data: { step: 2, data: finalData },
        success: true,
      };
    }

    throw new Error('Invalid step');
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (error instanceof z.ZodError) {
      errorMessage = error.issues.map((e) => e.message).join(', ');
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      ...prevState,
      error: errorMessage,
    };
  }
}
