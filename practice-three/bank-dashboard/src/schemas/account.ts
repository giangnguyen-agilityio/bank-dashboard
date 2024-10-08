import { z } from 'zod';

// Constants
import { REGEX_PATTERN, VALIDATION_MESSAGES } from '@app/constants';

// Utils
import { calculateAge } from '@app/utils';

export const accountSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.NAME.REQUIRED)
    .min(3, VALIDATION_MESSAGES.NAME.MIN_LENGTH)
    .regex(REGEX_PATTERN.NAME, VALIDATION_MESSAGES.NAME.PATTERN),

  username: z
    .string()
    .min(1, VALIDATION_MESSAGES.USERNAME.REQUIRED)
    .min(3, VALIDATION_MESSAGES.USERNAME.MIN_LENGTH)
    .max(30, VALIDATION_MESSAGES.USERNAME.MAX_LENGTH),

  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.PASSWORD.REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
    .max(50, VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH)
    .regex(REGEX_PATTERN.PASSWORD, VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS),

  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL.INVALID),

  dateOfBirth: z
    .string()
    .refine(
      (value) => {
        const today = new Date();
        const dob = new Date(value);

        return dob <= today;
      },
      { message: VALIDATION_MESSAGES.DATE_OF_BIRTH.MAX },
    )
    .refine(
      (value) => {
        const dob = new Date(value);

        return calculateAge(dob) >= 18;
      },
      { message: VALIDATION_MESSAGES.DATE_OF_BIRTH.MIN },
    ),
  presentAddress: z
    .string()
    .min(1, VALIDATION_MESSAGES.PRESENT_ADDRESS.REQUIRED)
    .min(3, VALIDATION_MESSAGES.PRESENT_ADDRESS.MIN_LENGTH)
    .max(100, VALIDATION_MESSAGES.PRESENT_ADDRESS.MAX_LENGTH),

  permanentAddress: z
    .string()
    .min(1, VALIDATION_MESSAGES.PERMANENT_ADDRESS.REQUIRED)
    .min(3, VALIDATION_MESSAGES.PERMANENT_ADDRESS.MIN_LENGTH)
    .max(100, VALIDATION_MESSAGES.PERMANENT_ADDRESS.MAX_LENGTH),

  city: z
    .string()
    .min(1, VALIDATION_MESSAGES.CITY.REQUIRED)
    .min(3, VALIDATION_MESSAGES.CITY.MIN_LENGTH)
    .max(100, VALIDATION_MESSAGES.CITY.MAX_LENGTH),

  postalCode: z
    .string()
    .min(1, VALIDATION_MESSAGES.POSTAL_CODE.REQUIRED)
    .min(4, VALIDATION_MESSAGES.POSTAL_CODE.MIN_LENGTH)
    .max(4, VALIDATION_MESSAGES.POSTAL_CODE.MAX_LENGTH)
    .regex(REGEX_PATTERN.POSTAL_CODE, VALIDATION_MESSAGES.POSTAL_CODE.PATTERN),

  county: z
    .string()
    .min(1, VALIDATION_MESSAGES.COUNTRY.REQUIRED)
    .min(3, VALIDATION_MESSAGES.COUNTRY.MIN_LENGTH)
    .max(60, VALIDATION_MESSAGES.CITY.MAX_LENGTH),
});

export const settingSchema = z
  .object({
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.PASSWORD.REQUIRED)
      .min(6, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
      .max(50, VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH)
      .regex(REGEX_PATTERN.PASSWORD, VALIDATION_MESSAGES.PASSWORD.REQUIREMENTS),

    newPassword: z
      .string()
      .min(1, VALIDATION_MESSAGES.PASSWORD.REQUIRED)
      .min(6, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
      .max(50, VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH)
      .regex(
        REGEX_PATTERN.PASSWORD,
        VALIDATION_MESSAGES.NEW_PASSWORD.REQUIREMENTS,
      ),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: VALIDATION_MESSAGES.NEW_PASSWORD.SHOULD_DIFFER,
    path: ['newPassword'],
  });
