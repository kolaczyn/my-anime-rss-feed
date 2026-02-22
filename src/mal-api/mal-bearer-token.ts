import type { AxiosRequestConfig } from 'axios';
import { readEnv } from '../shared/read-env';

export const malBearerToken: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${readEnv('ACCESS_TOKEN')}`,
  },
};
