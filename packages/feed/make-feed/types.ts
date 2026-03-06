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
