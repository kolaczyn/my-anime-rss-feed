export type EpisodeWatchedDate = {
  episode: number;
  date: Date;
};

export type EpisodeData = {
  filler: boolean;
  title: string;
};

export type EpisodeFullData = EpisodeWatchedDate & EpisodeData;

export type EnvVar =
  | 'BLOB_READ_WRITE_TOKEN'
  | 'MAL_CLIENT_ID'
  | 'CODE_CHALLANGE'
  | 'AUTH_CODE'
  | 'REFRESH_TOKEN';
