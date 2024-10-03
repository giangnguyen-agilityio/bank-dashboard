import { AxiosError } from 'axios';

// Interfaces
import { AccountResponse, IAccountData } from '@app/interfaces';

// Constants
import { END_POINTS, ERROR_MESSAGE } from '@app/constants';

// Services
import { httpClient } from '@app/services';

// Utils
import { handleAxiosError } from '@app/utils';

const getAccounts = async (
  page?: number,
  limit?: number,
): Promise<AccountResponse> => {
  try {
    const response = await httpClient.get(END_POINTS.USERS, {
      params: {
        page,
        limit,
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

const getAccountById = async (id: string): Promise<IAccountData> => {
  try {
    const response = await httpClient.get(`${END_POINTS.USERS}/${id}`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

const addNewAccount = async (
  data: Omit<IAccountData, 'id'>,
): Promise<IAccountData> => {
  try {
    const response = await httpClient.post(END_POINTS.USERS, data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

const updateAccount = async (data: IAccountData): Promise<IAccountData> => {
  try {
    const response = await httpClient.put(
      `${END_POINTS.USERS}/${data.id}`,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

const removeAccount = async (id: IAccountData['id']): Promise<void> => {
  try {
    await httpClient.delete(`${END_POINTS.USERS}/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

export {
  getAccounts,
  getAccountById,
  addNewAccount,
  updateAccount,
  removeAccount,
};
