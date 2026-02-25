export type JikanApiEpisodeDto = {
  data: {
    title: string;
  };
};

// TODO share frontend and backend types. But there's difference - date is string instead of Date
export type JsonFeed = {
  title: string;
  lastBuildDate: string;
  items: JsonFeedItem[];
};

export type JsonFeedItem = {
  title: string;
  pubDate: string;
};
