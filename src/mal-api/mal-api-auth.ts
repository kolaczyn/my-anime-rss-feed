import axios from 'axios';
import type { OAuthResponse } from './types';
import { malBearerToken } from './mal-bearer-token';
import { readEnv } from '../shared/read-env';

const API_URL_OAUTH_TOKEN = 'https://myanimelist.net/v1/oauth2/token';

export const fetchAccessToken = async (): Promise<OAuthResponse> => {
  const params = new URLSearchParams({
    client_id: readEnv('MAL_CLIENT_ID'),
    grant_type: 'authorization_code',
    code: readEnv('AUTH_CODE'),
    code_verifier: readEnv('CODE_CHALLANGE'),
  });

  const response = await axios.post<OAuthResponse>(API_URL_OAUTH_TOKEN, params);

  return response.data;
};

export const fetchRefreshToken = async (): Promise<OAuthResponse> => {
  const params = new URLSearchParams({
    client_id: readEnv('MAL_CLIENT_ID'),
    grant_type: 'refresh_token',
    refresh_token: readEnv('REFRESH_TOKEN'),
  });

  const response = await axios.post<OAuthResponse>(API_URL_OAUTH_TOKEN, params);

  return response.data;
};

export const fetchUserInformation = async () => {
  const apiUrl =
    'https://api.myanimelist.net/v2/users/@me?fields=anime_statistics';

  const response = await axios.get<unknown>(apiUrl, malBearerToken);

  return response.data;
};
