export type FeedType = 'rss' | 'json';

export type RssFeed = {
  rss: {
    '@_version': '2.0';
    channel: {
      title: string;
      link: string;
      description: string;
      lastBuildDate: string;
      language: string;

      item: RssFeedItem[];
    };
  };
};

export type RssFeedItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

export type JsonFeed = {
  title: string;
  lastBuildDate: Date;
  items: JsonFeedItem[];
};

export type JsonFeedItem = {
  title: string;
  pubDate: Date;
};
