const VALIDATION_MESSAGES = {
  USERNAME: {
    REQUIRED: 'Username is required',
    MIN_LENGTH: 'Username must be at least 3 characters long',
    MAX_LENGTH: 'Username must be at most 30 characters long',
  },
  PASSWORD: {
    MIN_LENGTH: 'Password must be at least 6 characters',
    MAX_LENGTH: 'Password must be at most 50 characters',
    REQUIREMENTS: 'Password needs at least one character and one number.',
  },
};

const FETCH_ERROR_MESSAGES = {
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
};

const SUCCESS_MESSAGE = {
  LOGIN: 'Login successfully.',
};

export {
  VALIDATION_MESSAGES,
  FETCH_ERROR_MESSAGES,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
};
