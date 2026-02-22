import { XMLBuilder, type XmlBuilderOptions } from 'fast-xml-parser';
import type { RssFeed, RssItem } from './types';
import type { EpisodeWatchedDate } from '../shared/types';

const makeRssItem = ({ episode, date }: EpisodeWatchedDate): RssItem => ({
  title: `Odcinek ${episode}`,
  description: `Odcinek ${episode}`,
  //     // TODO, daty muszą być w odpowiednim formacie (https://whitep4nth3r.com/blog/how-to-format-dates-for-rss-feeds-rfc-822/) oraz musi być informacja o strefie czasowej
  pubDate: date.toUTCString(),
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
      // TODO, daty muszą być w odpowiednim formacie (https://whitep4nth3r.com/blog/how-to-format-dates-for-rss-feeds-rfc-822/)
      lastBuildDate: new Date().toUTCString(),
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

export const makeRssFeed = async (
  episodeWatchedDateArr: EpisodeWatchedDate[],
) => {
  const json = makeRssFeedJson(episodeWatchedDateArr);

  const builder = new XMLBuilder(xmlBuilderOptions);
  const xmlContent = builder.build(json);
  return xmlContent;
};
