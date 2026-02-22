export type RssFeed = {
  rss: {
    '@_version': '2.0';
    // '@_xmlns:atom': 'http://www.w3.org/2005/Atom';
    // 'atom:link': {
    //   '@_href': string;
    //   '@_rel': 'self';
    //   '@_type': 'application/rss+xml';
    // };
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

export type RssItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  // guid: string;
};
