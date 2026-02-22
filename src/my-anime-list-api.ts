import axios from 'axios';

const API_URL_OAUTH_TOKEN = 'https://myanimelist.net/v1/oauth2/token';

type OAuthResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export const getAccessToken = async (): Promise<OAuthResponse> => {
  const params = new URLSearchParams({
    client_id: process.env.MAL_CLIENT_ID!,
    grant_type: 'authorization_code',
    code: process.env.AUTH_CODE!,
    code_verifier: process.env.CODE_CHALLANGE!,
  });

  const response = await axios.post<OAuthResponse>(API_URL_OAUTH_TOKEN, params);

  return response.data;
};

export const fetchRefreshToken = async (): Promise<OAuthResponse> => {
  const params = new URLSearchParams({
    client_id: process.env.MAL_CLIENT_ID!,
    grant_type: 'refresh_token',
    refresh_token: process.env.REFRESH_TOKEN!,
  });

  const response = await axios.post<OAuthResponse>(API_URL_OAUTH_TOKEN, params);

  return response.data;
};

export const getUserInformation = async () => {
  const apiUrl =
    'https://api.myanimelist.net/v2/users/@me?fields=anime_statistics';

  const response = await axios.get<unknown>(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return response;
};
