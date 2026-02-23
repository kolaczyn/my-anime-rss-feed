import { XMLBuilder, type XmlBuilderOptions } from 'fast-xml-parser';
import type { EpisodeWatchedDate } from '../shared/types.ts';
import type { RssFeed, RssFeedItem } from './types.ts';

// TODO fix date format (https://whitep4nth3r.com/blog/how-to-format-dates-for-rss-feeds-rfc-822/)
const formatDate = (date: Date) => date.toUTCString();

const makeRssItem = ({ episode, date }: EpisodeWatchedDate): RssFeedItem => ({
  title: `Odcinek ${episode}`,
  description: `Odcinek ${episode}`,
  pubDate: formatDate(date),
  link: 'https://myanimelist.net/profile/kanyastrange',
});

const makeRssFeedJson = (
  episodeWatchedDateArr: EpisodeWatchedDate[],
): RssFeed => ({
  rss: {
    '@_version': '2.0',
    channel: {
      title: 'Naruto Shippuuden Status',
      link: 'https://myanimelist.net/profile/kanyastrange',
      description: 'Status objerzanych odcinków Anime Shippuuden',
      lastBuildDate: formatDate(new Date()),
      language: 'pl',

      item: episodeWatchedDateArr.map((ep) => makeRssItem(ep)),
    },
  },
});

const xmlBuilderOptions: XmlBuilderOptions = {
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  format: true,
};

export const makeRssFeed = (episodeWatchedDateArr: EpisodeWatchedDate[]) => {
  const json = makeRssFeedJson(episodeWatchedDateArr);

  const builder = new XMLBuilder(xmlBuilderOptions);
  const xmlContent = builder.build(json);
  return xmlContent;
};
