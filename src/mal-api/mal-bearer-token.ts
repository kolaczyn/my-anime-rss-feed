import type { AxiosRequestConfig } from 'axios';

export const malBearerToken: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
};
