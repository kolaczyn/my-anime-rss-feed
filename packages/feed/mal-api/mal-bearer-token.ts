import type { AxiosRequestConfig } from 'axios';

export const malBearerToken = (accessToken: string): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
