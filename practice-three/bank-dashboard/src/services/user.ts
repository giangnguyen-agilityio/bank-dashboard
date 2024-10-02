import { AxiosError } from 'axios';

// Interfaces
import { AccountResponse, IAccountData } from '@app/interfaces';

// Constants
import { END_POINTS, ERROR_MESSAGE } from '@app/constants';

// Services
import { httpClient } from '@app/services';

// Utils
import { handleAxiosError } from '@app/utils';

const getUsers = async (): Promise<AccountResponse> => {
  try {
    const response = await httpClient.get(END_POINTS.USERS);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

const getUserById = async (id: string): Promise<IAccountData> => {
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

const addUser = async (
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

const updateUser = async (data: IAccountData): Promise<IAccountData> => {
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

const removeUser = async (id: IAccountData['id']): Promise<void> => {
  try {
    await httpClient.delete(`${END_POINTS.USERS}/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

export { getUsers, getUserById, addUser, updateUser, removeUser };
