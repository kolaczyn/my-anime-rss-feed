export type EpisodeWatchedDate = {
  episode: number;
  date: Date;
};

export type EnvVar =
  | 'BLOB_READ_WRITE_TOKEN'
  | 'MAL_CLIENT_ID'
  | 'CODE_CHALLANGE'
  | 'AUTH_CODE'
  | 'ACCESS_TOKEN'
  | 'REFRESH_TOKEN';
