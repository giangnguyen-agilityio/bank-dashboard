import { AxiosError } from 'axios';

// Constants
import { ERROR_MESSAGE, FETCH_ERROR_MESSAGES } from '@app/constants';

export const handleAxiosError = (error: AxiosError) => {
  const status = error.response?.status;

  if (status && status in FETCH_ERROR_MESSAGES) {
    throw new Error(FETCH_ERROR_MESSAGES[status]);
  }

  throw new Error(ERROR_MESSAGE.UNEXPECTED_ERROR);
};
