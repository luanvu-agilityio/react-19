import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  FIRST_NAME_ERROR,
  LAST_NAME_ERROR,
  PASSWORD_ERROR,
  USERNAME_ERROR,
} from '@/constant/message';
import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, FIRST_NAME_ERROR),
  lastName: z.string().min(1, LAST_NAME_ERROR),
  email: z.string().regex(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),
});
export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export const credentialsSchema = z.object({
  username: z.string().min(1, USERNAME_ERROR),
  password: z.string().min(8, PASSWORD_ERROR),
});
export type Credentials = z.infer<typeof credentialsSchema>;
