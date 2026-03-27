export type JsonFeed = {
  title: string;
  lastBuildDate: Date;
  items: JsonFeedItem[];
};

export type JsonFeedItem = {
  title: string;
  episodeTitle: string;
  pubDate: Date;
};

export type JsonFeedV2 = {
  buildDate: Date;
  lastWatchedEpisode: {
    title: string;
    episodeNumber: number;
    wikiUrl: string;
  };
  totalWatched: {
    naruto: number;
    shippuden: number;
  };
};
