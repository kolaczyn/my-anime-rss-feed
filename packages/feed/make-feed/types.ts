export type JsonFeed = {
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

export type HeatmapSource = {
  date: string;
  value: number;
}[];
