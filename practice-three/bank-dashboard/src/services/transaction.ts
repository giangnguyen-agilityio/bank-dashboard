import { AxiosError } from 'axios';

// Interfaces
import { TransactionKind, TransactionResponse } from '@app/interfaces';

// Constants
import { END_POINTS, ERROR_MESSAGE } from '@app/constants';

// Services
import { httpClient } from '@app/services';

// Utils
import { handleAxiosError } from '@app/utils';

const getTransactions = async (
  filter?: TransactionKind,
): Promise<TransactionResponse> => {
  try {
    const response = await httpClient.get(END_POINTS.TRANSACTIONS, {
      params: {
        type: filter,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

export { getTransactions };
