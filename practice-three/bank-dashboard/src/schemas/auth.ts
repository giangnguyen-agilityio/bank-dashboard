import { z } from 'zod';

// Constants
import { REGEX_PATTERN, VALIDATION_MESSAGES } from '@app/constants';

// Schema Validation for Login
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, VALIDATION_MESSAGES.USERNAME.REQUIRED)
    .min(3, VALIDATION_MESSAGES.USERNAME.MIN_LENGTH)
    .max(30, VALIDATION_MESSAGES.USERNAME.MAX_LENGTH),

  password: z
    .string()
    .min(6, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
    .max(50, VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH)
    .regex(REGEX_PATTERN.PASSWORD, VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS),
});

// Create a type based on the schema
export type LoginFormData = z.infer<typeof loginSchema>;
