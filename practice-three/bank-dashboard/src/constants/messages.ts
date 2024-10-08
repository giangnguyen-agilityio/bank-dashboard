const VALIDATION_MESSAGES = {
  USERNAME: {
    REQUIRED: 'Username is required',
    MIN_LENGTH: 'Username must be at least 3 characters long',
    MAX_LENGTH: 'Username must be at most 30 characters long',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 6 characters',
    MAX_LENGTH: 'Password must be at most 50 characters',
    REQUIREMENTS: 'Password needs at least one character and one number.',
    NOT_MATCH: 'The password does not match',
  },
  NEW_PASSWORD: {
    REQUIRED: 'New password is required',
    MIN_LENGTH: 'New password must be at least 6 characters',
    MAX_LENGTH: 'New password must be at most 50 characters',
    REQUIREMENTS: 'New password needs at least one character and one number.',
    SHOULD_DIFFER: 'The new password should not be the same as old password',
  },
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 'Name must be at least 3 characters long',
    PATTERN: 'Name should only contain letters and spaces',
  },
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address.',
  },
  DATE_OF_BIRTH: {
    REQUIRED: 'Date of birth is required',
    MAX: 'Date of birth cannot be in the future',
    MIN: 'You must be at least 18 years old',
  },
  PRESENT_ADDRESS: {
    REQUIRED: 'Present address is required',
    MIN_LENGTH: 'Present address must be at least 3 characters long',
    MAX_LENGTH: 'Present address must be at most 100 characters long',
  },
  PERMANENT_ADDRESS: {
    REQUIRED: 'Permanent address is required',
    MIN_LENGTH: 'Permanent address must be at least 3 characters long',
    MAX_LENGTH: 'Permanent address must be at most 100 characters long',
  },
  CITY: {
    REQUIRED: 'City is required',
    MIN_LENGTH: 'City must be at least 3 characters long',
    MAX_LENGTH: 'City must be at most 100 characters long',
  },
  POSTAL_CODE: {
    REQUIRED: 'Post code is required',
    MIN_LENGTH: 'Post code must be at least 4 characters long',
    MAX_LENGTH: 'Post code must be at most 4 characters long',
    PATTERN: 'Post code should only contain numbers',
  },
  COUNTRY: {
    REQUIRED: 'Country is required',
    MIN_LENGTH: 'Country must be at least 3 characters long',
    MAX_LENGTH: 'Permanent address must be at most 60 characters long',
  },
};

const FETCH_ERROR_MESSAGES: { [key: number]: string } = {
  400: 'The request could not be understood by the server due to malformed syntax. Please check your input and try again.',
  401: 'You are not authorized to access this resource. Please log in with valid credentials and try again.',
  403: 'You do not have permission to access this resource. Please contact the administrator if you believe this is an error.',
  404: 'The requested resource could not be found on this server. Please check the URL and try again.',
  405: 'The HTTP method used is not allowed for this resource. Please refer to the API documentation for the correct method.',
  406: 'The requested resource cannot generate content acceptable according to the Accept headers sent in the request. Please modify your request and try again.',
};

const ERROR_MESSAGE = {
  LOGIN: 'Email or password is incorrect.',
  TIMEOUT: `Request time out. The server didn't respond in time.`,
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
  SESSION_HAS_EXPIRED: 'Your session has expired',
};

const SUCCESS_MESSAGE = {
  LOGIN: 'Login successfully.',
  UPDATE_PASSWORD: 'Password changed successfully.',
  UPDATE_ACCOUNT: 'Account updated successfully.',
  DELETE_ACCOUNT: 'Account deleted successfully.',
};

export {
  VALIDATION_MESSAGES,
  FETCH_ERROR_MESSAGES,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
};
