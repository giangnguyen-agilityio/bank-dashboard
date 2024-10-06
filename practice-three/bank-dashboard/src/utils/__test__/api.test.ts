import { AxiosError } from 'axios';

// Constants
import { FETCH_ERROR_MESSAGES, ERROR_MESSAGE } from '@app/constants';

// Utils
import { handleAxiosError } from '@app/utils';

describe('handleAxiosError', () => {
  it('should throw the correct error message for known status codes', () => {
    const mockError = {
      response: {
        status: 400,
      },
    } as AxiosError;

    expect(() => handleAxiosError(mockError)).toThrow(
      FETCH_ERROR_MESSAGES[400],
    );
  });

  it('should throw unexpected error message for unknown status codes', () => {
    const mockError = {
      response: {
        status: 500,
      },
    } as AxiosError;

    expect(() => handleAxiosError(mockError)).toThrow(
      ERROR_MESSAGE.UNEXPECTED_ERROR,
    );
  });

  it('should throw unexpected error message if error is undefined', () => {
    const mockError = {
      response: {
        status: undefined,
      },
    } as unknown as AxiosError;

    expect(() => handleAxiosError(mockError)).toThrow(
      ERROR_MESSAGE.UNEXPECTED_ERROR,
    );
  });
});
