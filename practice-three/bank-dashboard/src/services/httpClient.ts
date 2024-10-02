import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';

// Constants
import { DESTINATION, ERROR_MESSAGE } from '@app/constants';

// Utils
import { convertDateToTimestamp } from '@app/utils';

const httpClient = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const exp = localStorage.getItem('exp');
    const navigate = useNavigate();

    if (exp) {
      const currentDay = convertDateToTimestamp(exp);

      if (Date.now() >= currentDay) {
        localStorage.clear();
        navigate({ to: DESTINATION.LOGIN });

        return Promise.reject(ERROR_MESSAGE.SESSION_HAS_EXPIRED);
      }
    }
    return config;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export { httpClient };
