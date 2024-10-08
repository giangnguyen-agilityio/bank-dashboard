import { AxiosError } from 'axios';

// Interfaces
import { AuthResponse, LoginFormData } from '@app/interfaces';

// Constants
import { END_POINTS, ERROR_MESSAGE } from '@app/constants';

// Services
import { httpClient } from '@app/services';

// Utils
import { handleAxiosError } from '@app/utils';

const login = async (
  user: LoginFormData,
): Promise<AuthResponse | undefined> => {
  try {
    const { data } = await httpClient.get(END_POINTS.USERS);

    const foundUser = data.users.find(
      ({ username, password }: LoginFormData) =>
        username === user.username && password === user.password,
    );

    return foundUser ? { users: foundUser, exp: data.exp } : undefined;
  } catch (error) {
    if (error instanceof AxiosError) {
      handleAxiosError(error);
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_ERROR);
  }
};

export { login };
