import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient };
