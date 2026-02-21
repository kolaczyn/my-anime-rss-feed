export type RssFeed = {
  rss: {
    '@_version': '2.0';
    channel: RssChannel;
  };
};

type RssChannel = {
  title: string;
  link: string;
  description: string;
  lastBuildDate: string;
  language: string;

  item: RssItem[];
};

type RssItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};
