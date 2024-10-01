// Interfaces
import { AuthResponse, LoginFormData } from '@app/interfaces';

// Constants
import { END_POINTS } from '@app/constants';

// Services
import { httpClient } from '@app/services';

const login = async (user: LoginFormData): Promise<AuthResponse> =>
  (
    await httpClient.get(END_POINTS.USERS, {
      params: {
        username: user.username,
        password: user.password,
      },
    })
  ).data;

export { login };
