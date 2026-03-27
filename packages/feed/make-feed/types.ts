export type JsonFeedV2 = {
  buildDate: Date;
  lastWatchedEpisode: {
    title: string;
    episodeNumber: number;
    wikiUrl: string;
    watchDate: Date;
  };
  totalWatched: {
    naruto: number;
    shippuden: number;
    lastSevenDays: number;
  };
};
