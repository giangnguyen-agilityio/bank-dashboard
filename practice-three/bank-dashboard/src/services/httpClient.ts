import axios from 'axios';

// Utils
// import { convertDateToTimestamp } from '@app/utils';

const httpClient = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // const exp = localStorage.getItem('exp');

    // if (exp) {
    //   const currentDay = convertDateToTimestamp(exp);

    //   if (Date.now() >= currentDay) {
    //     localStorage.clear();
    //     window.location.href = '/login';
    //     return Promise.reject('Your session has expired');
    //   }
    // }

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
