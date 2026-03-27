export type JikanApiEpisodeDto = {
  data: {
    title: string;
  };
};

// TODO share frontend and backend types. But there's difference - date is string instead of Date
export type JsonFeedV2 = {
  buildDate: string;
  lastWatchedEpisode: {
    title: string;
    episodeNumber: number;
    wikiUrl: string;
    watchDate: string;
  };
  totalWatched: {
    naruto: number;
    shippuden: number;
    lastSevenDays: number;
  };
};
